import React, { Component, useState } from 'react';
import { bulkupload } from './apiAdmin';
import Layout from '../core/Layout';
import axios from 'axios';
import { API, MICROAPI } from '../config';
import Copyright from '../core/Copyright';


class App extends Component {

  state = {
    display1: false,

    selectedFile: null
  };

  onFileChange = event => {
    event.preventDefault();


    this.setState({ selectedFile: event.target.files[0] });

  };


  onFileUpload = () => {


    const formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );


    console.log(this.state.selectedFile);

    bulkupload(formData).then((err, data) => {
      if (err) {
        console.log(err)

      }
      else {
        this.setState({ display1: true });

      }
    })

  };


  showSuccess = () => (

    <div
      className='alert alert-info'
      style={{ display: this.state.display1 == false ? 'none' : '' }}
    >
      <h2>Products uploaded successfully</h2>
    </div>
  );

  bulkupload = () => {
    return (
      <div>
        <div>

          <h4>Bulk Upload </h4>
          <div className='form-group'>
            <label className='btn btn-secondary'>
              <input
                onChange={this.onFileChange}
                type='file'
                name='photo'
              />
            </label>
          </div>
          <button onClick={this.onFileUpload} className='btn btn-dark'>Upload</button>
        </div>

      </div>
    )

  }
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>


          <p>File Type: {this.state.selectedFile.type}</p>


          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {



    return (
      <Layout
        title='bulk upload'
        description={`bulk upload`}
      >
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            {this.showSuccess()}
            {this.bulkupload()}
          </div>
        </div>
        <Copyright/>
      </Layout>

    );
  }
}

export default App;
