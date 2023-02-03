import React, { Component } from 'react';
import Error from '../../utils/widgets/Error';
export default class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state={
            error:{},
            isError:false
        }
    }
    componentDidCatch(error){
        this.setState({
            error:error,
            isError:true
        })
    }
  render() {
    return (
      <div>
        {this.state.isError?
        <Error errCode={500} errMessage={this.state.error}/>
        :
        this.props.children
        }
      </div>
    )
  }
}