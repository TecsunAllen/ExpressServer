/**
 * Created by admin on 2017/5/30.
 */


    var meteData;
    var wavArraybuffer;
    var clock;
    var path = "";
    var formatedWavData=[];

    function WavReader(byteArray) {
        this.buffer = byteArray;
        this.offset = 0;
        this.read_string = function (len) {
            var s = "";
            var end = this.offset + len;
            for (var i = this.offset; i < end; ++i) {
                s += String.fromCharCode(this.buffer[i]);
            }
            this.offset += len;
            return s;
        };

        this.read_number = function (length) {
            var it = this.offset + length - 1;
            var n = 0;
            for (; it >= this.offset; --it) {
                n = n * 256 + this.buffer[it];
            }
            this.offset += length;
            return n;
        };

        this.read_array = function (len) {
            var data = this.buffer.slice(this.offset, this.offset + len);
            this.offset += len;
            return data;
        }


    }
    function  load(url){
        path = url;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();
        xhr.onprogress = function (ev) {
        }
        xhr.onload = function (ev) {
            wavArraybuffer = xhr.response;
            if (wavArraybuffer.byteLength < 5000) return;
            meteData = parseWav(wavArraybuffer);
        }
        return meteData;
    }
    function parseWav(wavArrayBuffer){
        var data = wavArrayBuffer;
        var byteArray = new Uint8Array(data);
        var wavReader = new WavReader(byteArray);
        var meteData = {};
        meteData.ChunkID = wavReader.read_string(4); //4byte,资源交换文件标志:RIFF
        meteData.ChunkSize = wavReader.read_number(4);//4byte,从下个地址到文件结尾的总字节数
        meteData.Format = wavReader.read_string(4);//4byte,wav文件标志:WAVE
        meteData.formatType = wavReader.read_string(4);//4byte,波形文件标志:FMT(最后一位空格符)
        meteData.formatSize = wavReader.read_number(4);//4byte,音频属性
        meteData.compressionCode = wavReader.read_number(2);//2byte,格式种类(1-线性pcm-WAVE_FORMAT_PCM,WAVEFORMAT_ADPCM)

        meteData.NumChannels = wavReader.read_number(2);//2byte,通道数
        meteData.SampleRate = wavReader.read_number(4); //4byte,采样率
        meteData.bytesPerSecond = wavReader.read_number(4);//4byte,传输速率

        meteData.BlockAlign = wavReader.read_number(2); //2byte,数据块的对齐，即DATA数据块长度
        meteData.BitsPerSample = wavReader.read_number(2);//2byte,采样精度-PCM位宽

        meteData.Subchunk2ID = wavReader.read_string(4);//4byte,数据标志:data
        meteData.Subchunk2Size = wavReader.read_number(4); //4byte,从下个地址到文件结尾的总字节数，即除了wav header以外的pcm data length
        meteData.info = wavReader.read_string(meteData.Subchunk2Size);

        meteData.waveDataTitle = wavReader.read_string(4);
        meteData.waveDataLength = wavReader.read_number(4);
        meteData.waveData = wavReader.read_array(meteData.waveDataLength);
        //var subdscnum = wavReader.read_number(4);
        //var sss = wavReader.read_string(subdscnum);
        meteData.waveData = new Int8Array(meteData.waveData.buffer);
        meteData.time = Math.floor(meteData.waveData.length / meteData.bytesPerSecond);
        return meteData;
    }
    function getMeteData(){
        return meteData;
    }

    function formatWavData(){
        var index = 0;
        var forMatIndex = 0;
        while (index < meteData.waveData.length - 1){
            formatedWavData[forMatIndex] = Math.abs(meteData.waveData[index]);
            index +=  parseInt(meteData.bytesPerSecond * 0.05);
            forMatIndex++;
        }
    }

    function  play(){
        var wavPlayer = $("#wavPlayer")[0];
        $("#wavPlayer").attr("src",path);
    }




    function getCurWave() {
        var wavPlayer = $("#wavPlayer")[0];
        var index = Math.floor(wavPlayer.currentTime * meteData.bytesPerSecond);
        if (index % 2 != 0) index = index + 1;
        return meteData.waveData[index-1];
    }

    module.exports =  {
        load:load,
        parseWav:parseWav,
        getMeteData:getMeteData,
        play:play,
        getCurWave:getCurWave,
        formatWavData:formatWavData,
        get currentTime(){
            var wavPlayer = $("#wavPlayer")[0];
            return wavPlayer.currentTime;
        }
    }