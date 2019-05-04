import React from 'react';


class UploadPage extends React.Component {

    render() {
        return (
            <div className="ui center aligned basic segment">
                {/* First space */}
                <div className="ui placeholder segment">
                {/** Left */}
                    <div className="ui two column very relaxed stackable grid">
                        <div className="column">
                            {/**Content */}
                            <form className="ui form">
                                <div className="field">
                                    <label>Track name</label>
                                    <input type="text" name="first-name" placeholder="Track name"/>
                                </div>
                                <div className="field">
                                    <label>Author</label>
                                    <input type="text" name="last-name" placeholder="Author"/>
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <input type="text" name="last-name" placeholder="Description"/>
                                </div>
                            </form>
                        </div>

                        <div className="middle aligned column">
                            <div className="ui bulleted list">
                                <div className="item">Track name should be no more than 128 characters</div>
                                <div className="item">Author name should be no more than 128 characters</div>
                                <div className="item">Description should be no more than 200 words</div>
                            </div>
                        </div>

                    </div>
                    <div className="ui vertical divider">
                       {/* Right */}
                       <div className="column">
                        
                       </div>
                    </div>
                </div>
                {/* Second space */}
                <div className="ui horizontal divider">
                </div>
                <div className="ui teal labeled icon button">
                    Create New Order
                    <i className="add icon"></i>
                </div>
            </div>
        );
    }
}

export default UploadPage;