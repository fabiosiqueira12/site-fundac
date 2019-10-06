//use window.scrollY
var scrollpos = window.scrollY;
var header = document.getElementById("header-principal");

function add_class_on_scroll() {
    header.classList.add("fixed");
}

function remove_class_on_scroll() {
    header.classList.remove("fixed");
}

window.addEventListener('scroll', function(){ 
    //Here you forgot to update the value
    scrollpos = window.scrollY;

    if(scrollpos > 10){
        add_class_on_scroll();
    }
    else {
        remove_class_on_scroll();
    }
});

function toggleMenu() {
    document.getElementsByTagName('html')[0].classList.toggle('menu-active');
}

function closeMenu() {
    document.getElementsByTagName('html')[0].classList.remove('menu-active');
}

function getElementY(query) {
    return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
}

function doScrolling(element, duration) {
    var startingY = window.pageYOffset
    var elementY = getElementY(element)
    // If element is close to page's bottom then window will scroll only to some position above the element.
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
    var diff = targetY - startingY
    // Easing function: easeInOutCubic
    // From: https://gist.github.com/gre/1650294
    var easing = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }
    var start

    if (!diff) return

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed miliseconds since start of scrolling.
        var time = timestamp - start
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1)
        // Apply the easing.
        // It can cause bad-looking slow frames in browser performance tool, so be careful.
        percent = easing(percent)
        scrollTotal = startingY + diff * percent
        window.scrollTo(0, scrollTotal - 80)

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
}

function submitData(event, myForm) {
    var urlAjax = myForm.dataset.url;
    event.preventDefault();
    var elements = myForm.elements;
    var data = {};
    for (i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute('type') != 'submit' && elements[i].getAttribute('type') != 'button') {
            var nameAtribute = elements[i].getAttribute('name');
            var value = myForm.elements[i].value;
            data[nameAtribute] = value;
        }
    }
    sendData(BASE_URL + urlAjax, data, true);
}

function sendData(urlPost, data, withLoading = false) {
    var loading = document.getElementById("loader");
    if (withLoading) {
        loading.style.display = "block";
    }
    axios({
            method: 'post', // verbo http
            url: urlPost, // url
            data: data
        })
        .then(response => {
            loading.style.display = "none";
            if (response.data.result == 0) {
                Swal(
                    'Erro!',
                    response.data.message || 'Não foi possível concluir!',
                    'error'
                );
            } else {
                switch (response.data.action) {
                    case 'reload':
                        window.location.reload();
                        break;
                    case 'goto':
                        Swal({
                            title: 'Sucesso!',
                            text: response.data.message,
                            type: 'success',
                            showCancelButton: false,
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6'
                        }).then((resultSwal) => {
                            if (resultSwal.value) {
                                window.location.href = BASE_URL + response.data.link;
                            }
                        });
                        break;
                    case 'modal':

                        break;
                    case 'list':

                        break;
                    case 'new':
                        Swal({
                            title: 'Sucesso!',
                            text: response.data.message,
                            type: 'success',
                            showCancelButton: false,
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6'
                        }).then((resultSwal) => {
                            if (resultSwal.value) {
                                window.location.reload();
                            }
                        });
                        break;
                    case 'remove':
                        Swal({
                            title: 'Sucesso!',
                            text: response.data.message,
                            type: 'success',
                            showCancelButton: false,
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6'
                        }).then((resultSwal) => {
                            if (resultSwal.value) {
                                window.location.reload();
                            }
                        });
                        break;
                    case 'active':
                        Swal({
                            title: 'Sucesso!',
                            text: response.data.message,
                            type: 'success',
                            showCancelButton: false,
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6'
                        }).then((resultSwal) => {
                            if (resultSwal.value) {
                                window.location.reload();
                            }
                        });
                        break;
                    default:
                        Swal(
                            'Sucesso!',
                            response.data.message,
                            'success'
                        );
                        break;
                }
            }
        })
        .catch(error => {
            loading.style.display = "none";
            console.log(error);
        });
}

document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        closeMenu();
    }
};