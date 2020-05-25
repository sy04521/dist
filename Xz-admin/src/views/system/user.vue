<template>
    <div>
        <label class="btn btn-primary file-chooser">
            Change Picture
            <input type="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
        </label>
    </div>
</template>

<script>
import axios from "axios";
import { uploadAvatar } from "@/api/zoom";
export default {
    methods: {
        uploadAvatar(e) {
            console.log(e);
            uploadAvatar(e.target.files[0]);
        },
        // uploadAvatar(avatar) {
        //     console.log(avatar.target.files[0]);
        //     let data = new FormData();
        //     data.append("avatar", avatar);
        //     console.log(avatar);
        //     debugger;
        //     return axios.post("zooms/uploadimage", data, {
        //         headers: { "content-type": "multipart/form-data" }
        //     });
        // }
    }
};
</script>

