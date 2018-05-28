import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import { Doughnut } from 'react-chartjs-2';


const getOptions = gql`
query ($canvassId: String!) {
  getOptionsByCanvass(canvassId: $canvassId){
    id
    text
    voter_ids 
  }      
}`;

class Chart extends React.Component {

  generateDataObject = (options) => {
    const data = [];
    const labels = [];
    options.forEach((option) => {
      data.push(option.voter_ids.length);
      labels.push(option.text)
    });

    return {
      datasets: [{
        data: data,
        backgroundColor: [
          "salmon","darkgray", "aqua",  "pink", "coral",
          "blue", "purple", "magenta", "red", "green",
        ],
        borderColor: "#f8f8f8",
        borderWidth: 10,
      }],
      labels: labels
    }
  };

  componentDidUpdate () {
    if (this.props.refetch){
      setTimeout(() => {
        this.refetchData();
        this.props.reset();
      }, 200)
    }
  }

  render () {
    return (
      <Query  query={ getOptions }
              variables={{ canvassId: this.props.canvassId }}>

        {({ loading, error, data, refetch }) => {

          if (loading) return null;
          if (error) return error.toString();
          if (data) {

            this.refetchData = refetch;

            const options = data.getOptionsByCanvass;

            return (
              <Doughnut style={{ height: "90%" }} data={this.generateDataObject(options)}/>
            )
          }}}
      </Query>
    )
  }
}

export default Chart


