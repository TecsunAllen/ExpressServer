//依赖bootstrap框架
import React, { Component } from 'react';
class MeetingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [
                {
                    name: "",
                    src: "medium.mp4",
                    thumbSrc: "/images/folder.png"
                },
                {
                    name: "",
                    src: "movie.ogg",
                    thumbSrc: "/images/folder.png"
                },
                {
                    name: "",
                    src: "",
                    thumbSrc: "/images/folder.png"
                },
                {
                    name: "",
                    src: "",
                    thumbSrc: "/images/folder.png"
                },
                {
                    name: "",
                    src: "",
                    thumbSrc: "/images/folder.png"
                }
            ]
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    inputChangeHander() {

    }

    render() {

        var items = [];
        var videos = this.state.videos;
        var playImageSrc = "/images/play.png";
        for (var i = 0; i < videos.length; i++) {
            items.push(<div className="thumbnail" key={i} title={videos[i].name}>
                <video preload="auto"
                    poster="/images/folder.png">
                    <source src={videos[i].src} type='video/mp4' />
                </video>
            </div>)
        }
        return (
            <div>
                <div>视频列表</div>
                {items}
            </div>
        )
    }
}

export default MeetingPage;