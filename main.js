function total_cards() {
    var total = $('#buttons li.clicked').toArray()
    return total
};
function reset_cards() {
    // $('#buttons li.clicked').removeClass('clicked')
    $('#buttons li.handshake').remove()
    const colours = ['yellow', 'blue', 'white', 'green', 'red', 'purple']
    for (let i = 0; i < colours.length; i++) {
        colour = colours[i]
        $('#buttons ul.'+colour).prepend(`<li class="${colour} fas handshake">&#xf2b5</li>`)
    }
    $('#buttons li.clicked').removeClass('clicked')
    $('#reset').css('visibility', 'hidden')
    update_score()
}

function add_first_row() {
    $('#breakdown').append(`<tr id="desc">
    <th id="exp">EXPEDITION</th>
    <th id="sum">SUM</th>
    <th id="cost">COST</th>
    <th id="mult">MULTI </th>
    <th id="total">TOTAL</th>
    <th id="bonus">BONUS</th>
    <th id="final">FINAL</th>
    </tr>`)
}

function get_name(text) {
    if (text == 'Egyptian Desert') {
        return 'Desert'
    }
    else if (text == "Neptune's Realm") {
        return 'Atlantis'
    }
    else if (text == 'Himalaya Mountains') {
        return 'Mountains'
    }
    else if (text == 'Brazillian Rainforest') {
        return 'Rainforest'
    }
    else if (text == 'Ancient Volcanoes') {
        return 'Volcanoes'
    }
    else if (text == 'Purple Colour') {
        return 'Purple'
    }
}

function display_table(score, multiplier) {

    add_first_row()
    const colours = ['yellow', 'blue', 'white', 'green', 'red', 'purple']
    for (let i = 0; i < colours.length; i++) {
        const colour = colours[i]
        if (!isNaN(score[colour])) {
            const exp = $(`h3.${colour}`).text()
            const total = score[colour]
            let bonus = 0
            if ($('#buttons li.clicked.'+colour).toArray().length >= 8) {
                bonus = 20
            }
            const mult = multiplier[colour]
            const final = total * mult + bonus
            const row = `<tr class="${colour}"><th>${get_name(exp)}</th>
            <th>${total + 20}</th>
            <th>-20</th>
            <th>x${mult}</th>
            <th>${total * mult}</th>
            <th>${bonus}</th>
            <th>${final}</th></tr>`
            $('#breakdown').append(row)
        }
    }
    $('#breakdown').after('<hr id="temp">')
}

function update_score() {
    score = {
        yellow: NaN,
        blue: NaN,
        white: NaN,
        green: NaN,
        red: NaN,
        purple: NaN
    }
    multiplier = {
        yellow: 1,
        blue: 1,
        white: 1,
        green: 1,
        red: 1,
        purple: 1
    }
    let arr = $('#buttons li.clicked').toArray()
    for (let i = 0; i < arr.length; i++) {
        if (isNaN(score[arr[i].classList[0]])) {
                score[arr[i].classList[0]] = -20
        }
        if (arr[i].classList.contains('handshake')) {
            multiplier[arr[i].classList[0]]++
        }
        else {
            
            score[arr[i].classList[0]] += parseInt(arr[i].innerText)
        }
    }
    let final = 0
    scores = Object.keys(score)
    for (let i = 0; i < scores.length; i++) {
        let colour = scores[i]
        let value = score[colour]
        let mult = multiplier[colour]
        if (!isNaN(value)) {
            final += (value * mult)
        }
        if ($('#buttons li.clicked.'+colour).toArray().length >= 8) {
            final += 20
        }
    }
    $('#score').text(final)
    $('tr').remove()
    $('hr#temp').remove()
    if ($('#buttons li.clicked').toArray().length > 0) {
        display_table(score, multiplier)
    }
}

function button_click(event) {
    if (event.target.localName == 'li') {
        if (event.target.classList.contains('handshake')) {
            let colour = event.target.classList[0]
            let num_handshakes = $('#buttons li.handshake.'+colour).toArray().length
            let num_clicked = $('#buttons li.handshake.clicked.'+colour).toArray().length
            console.log('hands:',num_handshakes)
            console.log('clicked:',num_clicked)
            if (event.target.classList.contains('clicked')) {
                if (num_clicked == 3) {
                    $('#buttons li.handshake.'+colour).last().removeClass('clicked')
                }
                else {
                    $('#buttons li.'+colour).first().remove()
                }
            }
            else {
                if (num_handshakes < 3) {
                    $('#buttons ul.'+colour).prepend(`<li class="${colour} fas handshake clicked">&#xf2b5</li>`)
                }
                else {
                    $('#buttons li.handshake.'+colour).last().addClass('clicked')
                }
            }
        }
        else {
            event.target.classList.toggle('clicked');
        }
        if (total_cards().length > 0) {
            $('#reset').css('visibility', 'visible')
        }
        else {
            $('#reset').css('visibility', 'hidden')
        }
        update_score()
    }
}

$('.hidden').css('visibility', 'hidden')
buttons.onclick = button_click;
reset.onclick = reset_cards;
