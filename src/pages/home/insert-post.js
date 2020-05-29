import React from 'react';


// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

// 
import "../../config"
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale

// Import bootstrap(v3 or v4) dependencies
import '../../../node_modules/bootstrap/js/src/modal';
import '../../../node_modules/bootstrap/js/src/dropdown';
import '../../../node_modules/bootstrap/js/src/tooltip';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

import ImageUploader from 'react-images-upload';
import { MAIN_COLOR } from '../../constants/color';
import Axios from 'axios';
import { BASE_URL } from '../../constants/url'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            stringOutput: '',
            pictures: [],
        }
    }



    onChange = (content) => {
        console.log('onChange', content);
        this.setState({
            stringOutput: content
        })
    }
    onImageUpload = (fileList) => {

        const reader = new FileReader();
        reader.onloadend = () => {
            ReactSummernote.insertImage(reader.result);
        }
        reader.readAsDataURL(fileList[0]);
    }

    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        }, () => {
            console.log(this.state.pictures);
        })
    }

    _handleOnchangeText = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    _handleConfirmPost = () => {


        let tokenStorage = localStorage.getItem('token')
        console.log(tokenStorage);

        console.log(this.state);
        this.setState({
            show: true
        })

        let bodyFormData = new FormData();

        bodyFormData.append('nameFilm', this.state.title);
        bodyFormData.append('title', this.state.desciption)
        bodyFormData.append('content', this.state.stringOutput)
        bodyFormData.append('picture', this.state.pictures[0])

        
        

        Axios({
            method: "POST",
            url: `${BASE_URL}/posts/create/`,
            // data: {
            //     nameFilm: this.state.title,
            //     title: this.state.desciption,
            //     content: this.state.stringOutput
            // },
            data: bodyFormData,
            headers: {
                'Authorization': `Token ${tokenStorage}`,
                'Content-Type': 'multipart/form-data'
            }

        }).then(res => {

            console.log(res.data);

        }).catch(err => {
            console.log(bodyFormData);
            
            console.log({ ...err });

        })
    }

    render() {
        console.log(this.state.pictures);

        return (
            <div style={{ height: 1500, backgroundColor: '#e8e8e8' }}>
                <div style={{ height: 70 }}></div>


                <div style={{ backgroundColor: '#FFFFFF', paddingBottom: 20 }} className="container">
                    <div style={{ height: 100 }}></div>


                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <div style={{ width: "50%" }}>
                            <div style={{ width: "100%" }} className="form-group">
                                <label for="usr">Nhập Tên phim:</label>
                                <input name="title" onChange={this._handleOnchangeText} type="text" className="form-control" id="usr" />
                            </div>
                            <div style={{ width: "100%" }} className="form-group">
                                <label for="usr">Nhập mô tả ngắn về phim:</label>
                                <textarea name="desciption" onChange={this._handleOnchangeText} style={{ width: "100%" }} className="form-control" rows={3} placeholder="What's up?" required defaultValue={""} />
                            </div>
                        </div>

                        <ImageUploader
                            style={{ height: 300 }}
                            withIcon={false}
                            buttonText='Chọn ảnh nổi bật'
                            onChange={this.onDrop}
                            // imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            // maxFileSize={5242880}
                            withPreview={true}
                            label={false}
                            buttonStyles={{ backgroundColor: MAIN_COLOR, alighSeft: "flex-start", fontWeight: "bold", color: "#FFFFFF" }}
                        />
                    </div>




                    <p>Điền nội dung film:</p>
                    <ReactSummernote
                        // value={this.props.currentPost.text}
                        options={{
                            height: 350,
                            dialogsInBody: true,
                            toolbar: [
                                ['style', ['style']],
                                ['font', ['bold', 'underline', 'clear']],
                                ['fontname', ['fontname']],
                                ['para', ['ul', 'ol', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link', 'picture']],
                                ['view', []]
                            ]
                        }}
                        onChange={this.onChange}
                        onImageUpload={this.onImageUpload}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 20, marginTop: 20 }}>

                        <button
                            style={{ backgroundColor: MAIN_COLOR, color: '#FFFFFF', fontWeight: "bold" }}
                            className="btn"
                            onClick={this._handleConfirmPost}>
                            Đăng bài
                    </button>
                    </div>
                </div>

                <div className="container">
                    {
                        this.state.show &&
                        <div dangerouslySetInnerHTML={{ __html: this.state.stringOutput }}>

                        </div>
                    }
                </div>


            </div >
        );
    }
}

export default App;
