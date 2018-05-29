import React from 'react';
import gql from 'graphql-tag'
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import CreateOption  from './CreateOption';

const createCanvassMutation = gql`
mutation ($title: String!, $categoryId: String!, $canvassOptions: [String!]!) {
  createCanvass(title: $title, categoryId: $categoryId, canvassOptions: $canvassOptions){
    ok
    canvass{
      id
    }
  }       
}`;

const allCategoriesQuery = gql`
query {
  allCategories{
    name
    id
  }
}`;

class CreateCanvass extends React.Component {
  state = {
    title: '',
    categoryId: '',
    options: [],
    submitError: false
  };

  removeOption = (id) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option.id !== id)
    }))
  };

  addOption = () => {
    this.setState((prevState) => ({
      options: prevState.options.concat({ id: uuid(), text: '', voter_ids: []})
    }))
  };

  onOptionChange = (id, text) => {
    this.setState((prevState) => ({
      options: prevState.options.map((option) => {
        if(option.id === id){
          return{ id, text};
        } else { return option }
      })
    }))
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onCreateCanvass = async (e, createCanvass) => {
    e.preventDefault();

    const { title, categoryId, options } = this.state;

    if (!title || !categoryId || !options){
      this.setState({ submitError: true })
    }

    else {
      const canvassOptions = options.map((option) => option.text)
        .filter((option) => option.text !== "");

      if (canvassOptions.length){
        const response = await createCanvass({
          variables: {
            title,
            categoryId,
            canvassOptions
          }
        });

        const { ok, canvass } = response.data.createCanvass;

        if (ok) {
          this.props.history.push(`/${canvass.id}`);
        }
      } else {
        console.log("Nope")
      }
    }
  };

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render(){
    return(

      <Mutation mutation={createCanvassMutation}>
        {(createCanvass, { data }) => (
          <Query query={allCategoriesQuery}>
            {({ loading, error, data }) => {

              if (loading) return null;
              if (error) return <p>Error!: {error.toString()}</p>;

              const { allCategories } = data;

              return (
                <div className="createCanvass">
                  <h1 className="createCanvass__title">Create a Canvass</h1>
                  <div className="createCanvass__form">

                    <input name="title"
                           placeholder="Title"
                           type="text"
                           autoComplete="off"
                           className="createCanvass__formItem"
                           value={this.state.title}
                           onChange={this.onChange}/>

                    <select
                      className="createCanvass__dropdown"
                      name="categoryId"
                      onChange={this.onChange}>
                      <option value="">Select a category</option>
                      {allCategories.map((category) => (
                        <option
                          className="createCanvass__dropdown--option"
                          value={`${category.id}`}
                          key={category.id}>
                          {category.name}
                        </option>))}
                    </select>

                    <div className="createCanvass__options">
                      { this.state.options.map((option) => (
                        <CreateOption
                          id={option.id}
                          key={option.id}
                          removeOption={this.removeOption}
                          onChange={this.onOptionChange}/>
                      ))}
                    </div>

                    <button onClick={this.addOption}>Add Option</button>

                    <button className="createCanvass__formButton createCanvass__formButton--create"
                            onClick={(e) => { this.onCreateCanvass(e, createCanvass) }}
                    >
                      Create Canvass
                    </button>


                    <Link to="/">
                      <button className="createCanvass__formButton createCanvass__formButton--cancel"
                      >
                        Cancel
                      </button>
                    </Link>

                    { // Display field left blank Error
                      this.state.submitError &&
                      <p className="login__form--error">Please fill out all fields</p> }

                  </div>
                </div>
              )
            }}
          </Query>
        )}
      </Mutation>
    )
  }
}

export default CreateCanvass;