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
    showCovidApi()
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

// Show covid api
function showCovidApi() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/covid/cases`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    console.log(response);
    $("#covidApiArea").empty()
    $("#covidApiArea").append(
      ` <h5 class="card-title" style="color:#0B0A0A; font-size: 16px;">Oh no! COVID-19 confirmed case is ${(response.confirmed).toLocaleString('en')} and
          death case is ${(response.deaths).toLocaleString('en')} now!</h5>
        <h6 class="card-subtitle mt-3 text-muted" style="font-size: 14px;">That's why we stay home and watch anime!</h6>
      `
    )
  })
  .fail(err => {
    console.log(err);
  })
}