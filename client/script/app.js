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

$('#register-btn').click(event => {
  event.preventDefault();
  let name = $('#name-register').val();
  let email = $('#email-register').val();
  let password = $('#password-register').val();

  console.log(name, email, password);
  //TODO: Handle AJAX
});