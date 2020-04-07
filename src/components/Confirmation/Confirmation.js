import React, {Component} from 'react';
import Loader from '../UI/Loader/Loader';


class Confirmation extends Component {
  
  componentDidMount = () => {
    setTimeout(() => {
      this.props.history.push('/apps')
    }, 1000)
  }

  render () {
    return (
      <div className="text-center">
        <Loader />
        <h3>Updating...</h3>
      </div>
    );
  }
}

export default Confirmation;