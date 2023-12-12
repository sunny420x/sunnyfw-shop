if(getCookie('alert') != undefined) {
    alert = getCookie('alert')
    if(alert != undefined) {
        if(alert == "ordered") {
            Swal.fire({
                icon: 'success',
                title: 'Your orders has been send to the seller!',
            })
        }
        if(alert == "loggedin") {
            Swal.fire({
                icon: 'success',
                title: 'You are now logged in!',
            })
        }
        if(alert == "loggedout") {
            Swal.fire({
                icon: 'success',
                title: 'You are now logged out!',
            })
        }
        if(alert == "successfullyupdate") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Row has been updated!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        if(alert == "succuessfullydelete") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Row has been deleted!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        if(alert == "wrongpassword") {
            Swal.fire({
                icon: 'error',
                title: 'Oops Wrong Password...',
                text: 'This username and password are not match any rows!',
            })
        }
        if(alert == "successfullyinstall") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Database has been installed!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        document.cookie = "alert=; max-age=0;";
    }
}