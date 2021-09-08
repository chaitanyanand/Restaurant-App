import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';
class FileUpload extends Component {
    state = { selectedFile: null }
    fileSelectHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    FileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile);


        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'imageUpload', {
            method: 'POST',
            body: fd,
            headers: {
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })

            .then(response => alert("file uploaded successfully"))
            .catch(error => {
                console.log('File upload ', error.message);
                alert('Your file could not be uploaded\nError: ' + error.message);
            })
    }
    render() {
        return (
            <div>
                < input type="file" onChange={this.fileSelectHandler} />
                <button className="btn btn-primary" onClick={this.FileUploadHandler}>upload</button>
            </div >);
    }
}

export default FileUpload;