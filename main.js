function button_click(event) {
    if (event.target.localName == 'li') {
        event.target.classList.toggle('clicked');
        console.log(event)
    }
}
buttons.onclick = button_click;  