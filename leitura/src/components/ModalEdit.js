import React, { Component} from 'react'
import Modal from 'react-modal'

class ModalEdit extends Component{
    
    render(){
        return(
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <h3>Editing Post</h3>


            <form onSubmit={this.updatePost}>
                <div className="form-group">
                    <label htmlFor="title-post">Title: </label>
                    <input type="text" value={this.state.titlePost} className="form-control" id="title-post" onChange={this.handleTitlePostChange} />
                </div>
                                        
                <div className="form-group">
                    <label htmlFor="body-post">Body: </label>
                    <textarea value={this.state.bodyPost} className="form-control" id="body-post" rows="3" onChange={this.handleBodyPostChange}></textarea>
                </div>
                <div className="btn-toolbar">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn btn-primary" onClick={this.closeModal}>Cancel</button>
                </div>
            </form>
        </Modal>
        )
    }
}

export default MoldalEdit