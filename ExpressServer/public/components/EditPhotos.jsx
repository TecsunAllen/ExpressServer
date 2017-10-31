//依赖bootstrap框架
import React, { Component } from 'react';
class EditPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhotos: []
        };
    }
    componentDidMount() {
        this.refs.fileSelecter.style.display = 'none';
    }
    componentDidUpdate() {

    }

    selectFiles() {
        this.setState({
            selectedPhotos: []
        });
        this.refs.fileSelecter.click();
    }

    choosedPhotos() {
        var files = this.refs.fileSelecter.files;
        var selectedPhotos = [];
        var loadedLength = 0;
        for (var i = 0; i < files.length; i++) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(files[i]);
            fileReader.totalNum = files.length;
            fileReader.onloadend = (e) => {
                selectedPhotos.push(e.target.result);
                loadedLength++;
                if (loadedLength == e.target.totalNum) {
                    this.setState({
                        selectedPhotos: selectedPhotos
                    });
                }
            };
        }
    }

    submitForm(){
        var formdata=new FormData(this.refs.form);
        $.ajax({
            type : 'post',
            url : '/saveRecord',
            data : formdata,
            cache : false,
            processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
            contentType : false, // 不设置Content-type请求头
            success : function(){

            },
            error : function(){ 

            }
        });
    }

    imgLoaded(ev){
        var canvas = ev.target.parentElement.getElementsByTagName("canvas")[0];
        var img = ev.target;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(ev.target,0,0,img.naturalWidth,img.naturalHeight,0,0,canvas.width,canvas.height);
    }

    render() {
        var imageList = [];
        for (var i = 0; i < this.state.selectedPhotos.length; i++) {
            var imageUrl = this.state.selectedPhotos[i];
            imageList.push(<div key={i}>
                <img onLoad={(ev) => this.imgLoaded(ev)}  src={imageUrl} />
                <canvas style={{ display: 'none' }}/>
            </div>);
        }
        return (
            <form role="form" ref='form'>
                <div className="form-group">
                    <textarea name='text' style={{ width: '100%' }}
                        className="form-control" id="username"
                        placeholder="这一刻的想法。。。" />
                </div>
                <div className='photosContainer'>
                    {imageList}
                </div>
                <input name='photos' ref='fileSelecter' onChange={() => this.choosedPhotos()}
                    type="file" accept="image/*" multiple={true} />
                <button type="button" onClick={() => this.selectFiles()}
                    className="btn btn-default">+</button>
                <button type="button" onClick={() => this.submitForm()}
                    className="btn btn-default">Go!</button>
            </form>
        );
    }
}
export default EditPhotos;