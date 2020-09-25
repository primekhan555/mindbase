import axios from 'axios';

// let BASE_URL = 'http://ec2-3-135-119-95.us-east-2.compute.amazonaws.com:5000/api/v1';
let BASE_URL = 'http://3.134.101.139:5000/api/v1';
//let BASE_URL = 'http://531b9b77c2f7.ngrok.io/api/v1';

const UserAuthServices = {
  UserLogin: async (email, password) => {
    const config = {
      headers: {'Content-Type': `application/json`},
    };
    const body = {
      email: email,
      password: password,
    };
    const data = await axios.post(`${BASE_URL}/user/login`, body, config);
    return data;
  },

  UserRegister: async (
    firstName,
    lastName,
    officerId,
    email,
    gender,
    phone,
    password,
    datenam,
    departmentvalue,
  ) => {
    const config = {
      headers: {'Content-Type': `application/json`},
    };
    const body = {
      department: departmentvalue,
      officerId: officerId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      birthDate: datenam,
      phone: phone,
      password: password,
    };
    const data = await axios.post(`${BASE_URL}/user/signup`, body, config);
    return data;
  },

  UserUpdatem: async (
    _id,
    token,
    firstName,
    lastName,
    officerId,
    email,
    gender,
    phone,
    datenam,
    departmentvalue,
  ) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      _id: _id,
      department: departmentvalue,
      officerId: officerId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      birthDate: datenam,
      phone: phone,
    };
    console.log('----body----');
    console.log(body);
    const data = await axios.put(`${BASE_URL}/user`, body, config);
    return data;
  },

  UserUpdate: async (token, bosy) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = bosy;
    const data = await axios.put(`${BASE_URL}/user`, body, config);
    return data;
  },

  GetMoodList: async () => {
    const config = {
      headers: {
        'Content-Type': `application/json`,
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDUzZmQxZmQyODY5MDUwMDk3MzY0NCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1OTEyODc2NzV9.8Ch0lThirNnlpMTyU72FQqy_Db2nGo1Bp5Z5D9nXChQ',
      },
    };
    const data = await axios.get(`${BASE_URL}/feeling`, config);
    return data;
  },

  GetDepartment: async () => {
    const config = {
      headers: {'Content-Type': `application/json`},
    };
    const data = await axios.get(`${BASE_URL}/admin`, config);
    return data;
  },

  AddMooduser: async (token, mood, extra) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      mainFeeling: mood,
      extraFeeling: extra,
    };
    const data = await axios.post(`${BASE_URL}/mood`, body, config);
    return data;
  },
  GetMoodListUser: async token => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      startDate: '2019-06-05T09:54:22.214Z',
      endDate: '2022-10-05T09:54:22.214Z',
    };
    const data = await axios.post(
      `${BASE_URL}/mood/filterByUser`,
      body,
      config,
    );
    return data;
  },
  GetChatUser: async (token, user_id) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    console.log('dddddddddddddddddddddddddddddddddddd');
    console.log(token);
    console.log(user_id);
    const data = await axios.get(
      `${BASE_URL}/user/getByDepartmentAndPeer/${user_id}`,
      config,
    );
    return data;
  },

  GetPostAll: async (token, user_id) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.get(`${BASE_URL}/post`, config);
    return data;
  },
  GetPostAllUser: async (_id, token) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.get(`${BASE_URL}/post/getByUser/${_id}`, config);
    return data;
  },
  GetnoteAllUser: async token => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.get(`${BASE_URL}/userNote/getByUser`, config);
    return data;
  },
  DeletePost: async (deletpost, token) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.delete(`${BASE_URL}/post/${deletpost}`, config);
    return data;
  },
  AddPostuser: async (token, text, images) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      text: text,
      media: images,
    };
    const data = await axios.post(`${BASE_URL}/post`, body, config);
    return data;
  },
  UpdatePostuser: async (token, _id, text, images) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      _id: _id,
      text: text,
      media: images,
    };
    const data = await axios.put(`${BASE_URL}/post`, body, config);
    return data;
  },

  DeletePostuser: async (token, _id) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.delete(`${BASE_URL}/post/${_id}`, config);
    return data;
  },
  LikePostuser: async (token, post_id, user_id) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      id: post_id,
      type: 'post',
    };
    const data = await axios.post(`${BASE_URL}/post/like`, body, config);
    return data;
  },

  SharePostuser: async (token, post_id) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      post: post_id,
      sharedTo: user_id,
    };
    const data = await axios.post(`${BASE_URL}/like`, body, config);
    return data;
  },

  AddNoteuser: async (token, title, note) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      title: title,
      note: note,
    };
    const data = await axios.post(`${BASE_URL}/userNote`, body, config);
    return data;
  },

  UpdateNoteuser: async (token, _id, note) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      _id: _id,
      note: note,
    };
    const data = await axios.put(`${BASE_URL}/userNote`, body, config);
    return data;
  },
  DeleteNoteuser: async (token, _id) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.delete(`${BASE_URL}/userNote/${_id}`, config);
    return data;
  },
  GetMp3All: async token => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.get(`${BASE_URL}/mp3`, config);
    return data;
  },
  GetActivityAll: async token => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.get(`${BASE_URL}/activity`, config);
    return data;
  },
  CommentPostuser: async (token, post_id, text) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      post: post_id,
      text: text,
    };
    console.log(body);
    const data = await axios.post(`${BASE_URL}/comment`, body, config);
    return data;
  },
  UploadImageUrl: async (token, media) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      media: [media],
    };
    console.log(body);
    const data = await axios.post(
      `${BASE_URL}/media/uploadImageUrl`,
      body,
      config,
    );
    return data;
  },
  GetNotification: async token => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.get(
      `${BASE_URL}/notification/getByReceiver`,
      config,
    );
    return data;
  },
  GetComment: async (token, post_id) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    console.log(token);
    const data = await axios.get(
      `${BASE_URL}/comment/getByPost/${post_id}`,
      config,
    );
    return data;
  },
  GetHelp: async token => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const data = await axios.get(`${BASE_URL}/aboutUs`, config);
    return data;
  },
  GetActivityMood: async (token, startDate, endDate) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      startDate: startDate,
      endDate: endDate,
    };
    console.log(body);
    const data = await axios.post(
      `${BASE_URL}/dailyMood/filterByUser`,
      body,
      config,
    );
    return data;
  },
  Adddailymood: async (token, feeling, rested, thought, stress, note) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      feeling: feeling,
      rested: rested,
      thought: thought,
      stress: stress,
      note: note,
    };
    console.log(body);
    const data = await axios.post(`${BASE_URL}/dailyMood`, body, config);
    return data;
  },
  AddCallMessage: async (token, call, message) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      call: call,
      message: message,
    };
    console.log(body);
    const data = await axios.post(
      `${BASE_URL}/mood/addCallMessage`,
      body,
      config,
    );
    return data;
  },
  AddSession: async (token, session) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      session: session,
    };
    console.log(body);

    const data = await axios.post(`${BASE_URL}/mood/addsession`, body, config);
    console.log(data.status);
    return data;
  },
  AddTips: async (token, tip) => {
    const config = {
      headers: {'Content-Type': `application/json`, Authorization: token},
    };
    const body = {
      tip: tip,
    };
    console.log(body);
    const data = await axios.post(`${BASE_URL}/mood/addtips`, body, config);
    console.log(data.status);
    return data;
  },
};

export default UserAuthServices;
