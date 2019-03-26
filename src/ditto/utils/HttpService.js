import { message } from 'antd';
import FileDownload from 'react-file-download'
import axios from 'axios'

export const downloadFile = (url, id, removeFunct) => {
    axios.get(url, { responseType: 'arraybuffer' })
    .then((response) => {
        const fileName = "file" + id + ".zip"
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileDownload(blob, fileName);
        message.success("Download File ID: " + id + " Completed", 2);
        removeFunct(id);
    })
    .catch(error => {
        console.log(error);
        message.error("Error downloading report", `Report id: ${id}. Status code: ${error.response}`, 2);
        removeFunct(id);
    });
};