const baseUrl = 'http://localhost:3000'

$('#register-form').hide();



$(document).ready(() => {

  $('#toRegister').click((event) => {
    event.preventDefault();
    $('#login-form').hide();
    $('#register-form').fadeIn();
  });

  $('#toLogin').click((event) => {
    event.preventDefault();
    $('#register-form').hide();
    $('#login-form').fadeIn();
  });

  $('#show-pass').click(() => {
    $('#show-pass').is(':checked') ? $('#password-login').attr('type', 'text') : $('#password-login').attr('type', 'password');
  });

  if (localStorage.access_token) {
    $('#landing-page').hide();
    $('#dashboard-page').show();
    animeAPI();
    // $('#dashboard-page').hide(); //debug
    // $('#landing-page').show();
  } else {
    // $('#landing-page').hide(); // debug
    // $('#dashboard-page').show();

    $('#dashboard-page').hide();
    $('#landing-page').show();
  }
});

$('#login-btn').click(event => {
  event.preventDefault();
  let email = $('#email-login').val();
  let password = $('#password-login').val();

  $.ajax({
    method:'POST',
    url: `${baseUrl}/login`,
    data:{email,password}
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token);

    animeAPI();
    $('#landing-page').hide();
    $('#dashboard-page').show();
  })
  .fail(err => {
    const alert = alertSect('failed', "Your Email or Password is invalid");

    $(alert).appendTo('#alert');
  })
  .always(() => {
    $('#email-login').val('');
    $('#password-login').val('');
  })
});

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);
  $.ajax({
    method: "POST",
    url: `${baseUrl}/google/googleLogin`,
    data: { id_token }
  })
  .done(response => {
    console.log(response);
    localStorage.setItem("access_token", response.access_token)

    $('#landing-page').hide();
    $('#dashboard-page').show();
  })
  .fail((xhr, status) => {

  })

 


  // $.ajax({
  //   method: 'POST',
  //   url: 'http://localhost:5500/users/loginGoogle',
  //   data: { id_token }
  // })
  //   .done(response => {
  //     // console.log(response);

  //     localStorage.setItem('access_token', response.access_token);
  //     // TODO : hide landing page
  //     // TODO : show todo page
  //   })
  //   .fail((xhr, status) => {

  //   });

  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

//logout
$("#logout").click((event) => {
  event.preventDefault();
  localStorage.clear();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('#dashboard-page').hide();
  $('#landing-page').show();
})


$('#register-btn').click(event => {
  event.preventDefault();
  let name = $('#name-register').val();
  let email = $('#email-register').val();
  let password = $('#password-register').val();

  //TODO: Handle AJAX

  $.ajax({
    method:'POST',
    url: `${baseUrl}/register`,
    data:{name, email,password}
  })
  .done(response => {
    const alert = alertSect('success', 'Your account is created, now let\'s login!');

    $(alert).appendTo('#alert');
    $('#register-form').hide();
    $('#login-form').fadeIn();
  })
  .fail(err => {
    const alert = alertSect('failed', err.responseJSON[0]);

    $(alert).appendTo('#alert');
  })
  .always(() => {
    $('#name-register').val('');
    $('#email-register').val('');
    $('#password-register').val('');
  })

});

const alertSect = (type, msg)  => {
  if (type === 'success') {
    const temp = `
    <div class="alert alert-success alert-dismissable fade show" role="alert">
      <strong style="color:#1E1E1E">Success</strong> ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" style="color:#1E1E1E">&times;</span>
      </button>
    </div>
    `;
    return temp;
  } else if (type === 'failed') {
    const temp = `
    <div class="alert alert-danger alert-dismissable fade show" role="alert">
      <strong style="color:#1E1E1E">Error</strong> ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" style="color:#1E1E1E">&times;</span>
      </button>
    </div>
    `;
    return temp;
  };
};

function animeAPI(){
  console.log('API BERHASIL MEN');
  $.ajax({
    method:'GET',
    url:`${baseUrl}/anime`,
    headers:{
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    console.log(response);
    // console.log();
    $('#anime-list-area').empty();
    for (let i = 0; i < response.data.length; i++) {
      $('#anime-list-area').append(
        `
        <li class="booking-card" style="background-image: url(${response.data[i].node.main_picture.large})">
          <div class="book-container">
          </div>
          <div class="informations-container">
            <h2 class="title titleText">${response.data[i].node.title}</h2>
            <p class="price"><svg class="icon" style="width:20px;height:20px;fill:#0a4870;margin-top: -5px;" viewBox="0 -10 511.99143 511"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657" />
              </svg>${response.data[i].node.rank}</p>
            <div class="more-information">
              <p class="disclaimer text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi eveniet perferendis
                culpa. Expedita architecto nesciunt, rem distinctio</p>
                <button onclick="location.href="https://myanimelist.net/anime/${response.data[i].node.id}"' class="btn btn-primary btn-sm">More Info</button>
                <p class="price" style="margin-top: 16px;">Studio: xxx</p>
                <p class="price" style="margin-bottom: 0;">Episodes: xxx</p>
            </div>
          </div>
        </li>
  ` 
  
      );
  
      
    }
    
  })
}