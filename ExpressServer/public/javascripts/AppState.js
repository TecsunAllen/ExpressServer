var AppState = {
    currentFolder: {
        path: 'C:/fileStore/default',
        fileList:[],
        folderList:[]
    },
    searchedFiles:{
        fileList:[]
    },
    selectedFilePath:"",


    fundApp:{
        filter:{
            name:""
        }
    }
};

export default AppState;