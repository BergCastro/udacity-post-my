import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        position: 'absolute',
        top: '20%',
        left: '20%',
        right: '20%',
        bottom: '30%',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};

class ModalEditComment extends Component {
   
    state = {
        id: '',
        body: ''


    }
    

   

    afterOpenModal = () => {
        const { comment } = this.props
        console.log("aftermodal: "+comment)
        this.setState({
            id: comment.id,
            body: comment.body
        })
    }

   
    handleBodyChange = (event) => {
        this.setState({ body: event.target.value });
    }

    cleanInputs = (event) => {
        event.preventDefault()
        this.setState({
              body: ''
        })    
    }

    submitUpdate = (event) => {
        event.preventDefault()
        const { updateComment } = this.props
        const id = this.state.id
        const body = this.state.body
       
        
        updateComment(event, id, body)
        
    }

    

    render() {
        const { isOpen , closeModalEditComment, updateComment } = this.props
        return (
            <Modal
                isOpen={isOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={closeModalEditComment}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h3>Edit Comment</h3>


                <form onSubmit={this.submitUpdate}>
                    <div className="form-group">
                        <label htmlFor="title-post">Body: </label>
                        
                        <textarea value={this.state.body} className="form-control" id="body-comment" rows="3" onChange={this.handleBodyChange}></textarea>
                    </div> 
                    
                    <div className="btn-toolbar">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button className="btn btn-primary" onClick={closeModalEditComment}>Cancel</button>
                        <button  className="btn btn-primary" onClick={this.cleanInputs}>Reset</button>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default ModalEditComment