import React, {Component} from 'react';
import './App.css';

async function getUserData({email, password, app}) {
  return fetch('https://dev.tuten.cl:443/TutenREST/rest/user/testapis%40tuten.cl', {
    method: 'PUT',
    headers: {
      Host: 'dev.tuten.cl',
      Accept: 'application/json',
      App: app,
      Password: password,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
  }).then(r => r.json())
}

async function getData() {
  const formData = {
    email: 'testapis@tuten.cl',
    password: '1234',
    app: 'APP_BCK'
  }
  try {
    const userData = await getUserData(formData);
    if (userData.sessionTokenBck) {
      const bookingReqUser = {...formData, sessionTokenBck : userData.sessionTokenBck};
      return getBookings(bookingReqUser)
    }
  } catch (error) {
    return Promise.reject(error)
  }

}
async function getBookings({email: Adminemail, password, app, sessionTokenBck}) {
  return fetch('https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true', {
    method: 'GET',
    headers: {
      Host: 'dev.tuten.cl',
      Accept: 'application/json',
      App: app,
      Password: password,
      'Content-Type': 'application/json',
      Token: sessionTokenBck,
      Adminemail: Adminemail
    },
  }).then((r) => r.json())
}

// let arr = [];
  getData().then(data => data).then(resp => {
    // console.log(JSON.parse(resp[0].bookingFields))
  console.log(JSON.parse(resp[0].bookingFields).extras)
  console.log(JSON.parse(resp[0].bookingFields).location)
  console.log(JSON.parse(resp[1].bookingFields).extras)
  console.log(JSON.parse(resp[1].bookingFields).location)
  // for (let i = 0; i< arr.length; i++) {
  // const element = arr[i];

  // console.log(element);
  //     }

})
.catch( error => console.log(error));



class App extends Component {

render(){
  
  return (
    <div>
      <div>
        <h1>TEST3#</h1>
        
      </div>
    </div>
  );
    }
}

export default App;
