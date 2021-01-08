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
    // TODO : hide landing page
    // TODO : show todo page
  } else {
    // TODO : show landing page
    // TODO : hide todo page
  }
});

$('#login-btn').click(event => {
  event.preventDefault();
  let email = $('#email-login').val();
  let password = $('#password-login').val();

  console.log(email, password);
  //TODO: Handle AJAX
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
  event.preventDefault()
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
})


$('#register-btn').click(event => {
  event.preventDefault();
  let name = $('#name-register').val();
  let email = $('#email-register').val();
  let password = $('#password-register').val();

  console.log(name, email, password);
  //TODO: Handle AJAX
});