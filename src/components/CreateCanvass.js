import React from 'react';
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';

const createCanvassMutation = gql`
mutation ($title: String!, $categoryId: String!, $canvassOptions: [String!]!) {
  createCanvass(title: $title, categoryId: $categoryId, canvassOptions: $canvassOptions)       
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
    canvassOptions: [],
    submitError: false
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onCreateCanvass = async (e, createCanvass) => {
    e.preventDefault();
    const { title, categoryId, canvassOptions } = this.state;

    if (!title || !categoryId || !canvassOptions){
      this.setState({ submitError: true })
    }

    else {
      const response = await createCanvass({
        variables: {
          title,
          categoryId,
          canvassOptions
        }
      });

      const { ok, canvass } = response.data.createCanvass;

      if (ok) {
        this.props.history.push(`/c/${canvass.id}`);
      }
    }
  };

  render(){
    return(

      <Query query={allCategoriesQuery}>
        {({ loading, error, data }) => {

          if (loading) return null;
          if (error) return <p>Error!: {error.toString()}</p>;

          const { allCategories } = data;

          return (
            <Mutation mutation={createCanvassMutation}>
              {(createCanvass, { data }) => (

                <div className="createCanvass">
                  <h1 className="createCanvass__title">Create a Canvass</h1>
                  <form className="createCanvass__form"
                        onSubmit={ (e) => { this.onCreateCanvass(e, createCanvass) }}>

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


                    <button className="createCanvass__formButton createCanvass__formButton--create"
                            type="submit"
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

                  </form>
                </div>

              )}
            </Mutation>
            )
        }}
      </Query>
    )
  }
}

export default CreateCanvass;