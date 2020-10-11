$.fn.puissance4 = function (x, y) {
    let player = 1;
    let descente;
    let open = false;
    let abscisse = ['0', '0', '0', '0', '0', '0', '0'];
    let i = 0;
    for (let i = 7; i < x; i++) {
        abscisse.push('0');
    }
    let map = [];

    function tableau() {
        map = [];
        for (let i = 0; i < y; i++) {
            map.push(abscisse.slice());
        }
    }

    let play_y = 0;

    function play(x, player) {
        let i = 0;
        while (i < map.length) {
            if (map[i][x] == 0) {
                map[i][x] = player;
                return i;
            }
            i++;
        }
        return "Stop";
    }

    function initialisation_visuel(map) {
        let balises = "";
        let rangee = "";
        for (let i = 0; i < map.length; i++) {
            rangee = "";
            for (let j = 0; j < map[i].length; j++) {
                rangee = rangee + '<img draggable="false" class="case" src="https://puissance4.cet1bot.app/public/images/vide.png" x="' + j + '" y="' + i + '" function="play">';
            }
            balises = '<div class="rangee">' + rangee + '</div>' + balises;
        }
        return '<div id="tableau">' + balises + '</div>';
    }

    function check() {
        let count = 0;
        let last = 0;

        for (let i = 0; i < map.length; i++) {
            for (let y = 0; y < map[i].length; y++) {
                if (map[i][y] == last && map[i][y] != 0) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                } else if (map[i][y] != 0) {
                    last = map[i][y];
                    count = 1;
                } else {
                    count = 0;
                    last = 0;
                }
            }
        }

        for (let i = 0; i < map[0].length; i++) {
            for (let y = 0; y < map.length; y++) {
                if (map[y][i] == last && map[y][i] != 0) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                } else if (map[y][i] != 0) {
                    last = map[y][i];
                    count = 1;
                } else {
                    count = 0;
                    last = 0;
                }
            }
            count = 0;
            last = 0;
        }
        let deplacement = 1;
        
        for (let i = 0; i < map.length; i++) {
            for (let y = 0; y < map[i].length; y++) {
                if (map[i][y] != 0) {
                    count = 1;
                    let value = map[i][y];
                    let i_bis = i + 1;
                    let y_bis = y + 1;
                    while (deplacement < 4 && i_bis < map.length && y_bis < map[0].length) {
                        if (map[i_bis][y_bis] == value) {
                            count++;
                        }
                        i_bis++;
                        y_bis++;
                        deplacement++
                    } if (count == 4) {
                        return true;
                    }
                    deplacement = 1;
                }
            }
        }

        for (let i = 0; i < map.length; i++) {
            for (let y = 0; y < map[i].length; y++) {
                if (map[i][y] != 0) {
                    count = 1;
                    let value = map[i][y];
                    let i_bis = i + 1;
                    let y_bis = y - 1;
                    while (deplacement < 4 && i_bis < map.length && y_bis >= 0) {
                        if (map[i_bis][y_bis] == value) {
                            count++;
                        }
                        i_bis++;
                        y_bis--;
                        deplacement++
                    } if (count == 4) {
                        return true;
                    }
                    deplacement = 1;
                }
            }
        }
        return false;
    }

    let animation = function () {
        open = false;
        if (i < y - 1) {
            $("img[x='" + play_x + "'][y='" + (i + 1) + "']").attr("src", "https://puissance4.cet1bot.app/public/images/vide.png")
        }
        if (player == 1) {
            $("img[x='" + play_x + "'][y='" + i + "']").attr("src", "https://puissance4.cet1bot.app/public/images/Jeton" + playerOne + ".png")
            if (i == play_y) {
                player = 2;
                clearInterval(descente);
                $(".felin2").css("filter", "grayscale(0)");
                $(".felin1").css("filter", "grayscale(1)");
                open = true;
                if (check()) {
                    $("#victory").attr("src", "https://puissance4.cet1bot.app/public/video/win" + playerOne + "-" + playerTwo + ".mp4")
                    document.getElementById('victory').play();
                    $('#victory').css("display", "block");
                    $('#victory').on('ended',function(){
                        $('#victory').css("display", "none");
                    }) ;
                    $(".felin1").css("filter", "grayscale(0)");
                    $(".felin2").css("filter", "grayscale(1)");
                    victoryP1++;
                    $('p').text("PLAYER ONE " + victoryP1 + " - " + victoryP2 + " PLAYER TWO");
                    open = false;
                }
            }
        } else if (player == 2) {
            $("img[x='" + play_x + "'][y='" + i + "']").attr("src", "https://puissance4.cet1bot.app/public/images/Jeton" + playerTwo + ".png")
            if (i == play_y) {
                player = 1;
                clearInterval(descente);
                $(".felin1").css("filter", "grayscale(0)");
                $(".felin2").css("filter", "grayscale(1)");
                open = true;
                if (check()) {
                    $("#victory").attr("src", "https://puissance4.cet1bot.app/public/video/win" + playerTwo + "-" + playerOne + ".mp4")
                    document.getElementById('victory').play();
                    $('#victory').css("display", "block");
                    setTimeout(function(){
                        $('#victory').css("display", "none");
                    }, 6000);
                    $(".felin2").css("filter", "grayscale(0)");
                    $(".felin1").css("filter", "grayscale(1)");
                    victoryP2++;
                    $('p').text("PLAYER ONE " + victoryP1 + " - " + victoryP2 + " PLAYER TWO");
                    open = false;
                }
            }
        }
        i--;
    }

    tableau();
    $(this).append('<video id="victory"><source src="" type="video/mp4">Ton navigateur est trop nul pour voir cette victoire</video><div id="menu"><h1>CHOOSE YOUR FIGHTER</h2><p>PLAYER ONE</p><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose1.png" cbt="1"><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose2.png" cbt="2"><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose3.png" cbt="3"><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose4.png" cbt="4"><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose5.png" cbt="5"><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose6.png" cbt="6"><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose7.png" cbt="7"><img draggable="false" class="choice" src="https://puissance4.cet1bot.app/public/images/Choose8.png" cbt="8"><div id="confirm">START J1</div></div>' + initialisation_visuel(map) + '<img class="felin1" src=""><img class="felin2" src="">');
    let PlayerChoice = 0;
    let selection = 0;
    let playerOne = 0;
    let playerTwo = 0;
    let victoryP1 = 0;
    let victoryP2 = 0;
    $('body').css({ "background-color": "#606060", "text-align": "center" });
    $('#menu').css({ "background-color": "black", "color": "white" });
    $('#victory').css({"width": "100%", "position": "fixed", "z-index": "30", "height": "100%", "display" : "none", "left": "0", "right": "0", "top" : "0", "bottom" : "0"})
    $('#confirm').css({ "background-color": "white", "color": "black", "padding": "10px 0px", "cursor" : "pointer", "user-select":"none"});
    $('#tableau').css({ 'font-size': '0', "margin": "0 15%", "width": "70%", "position": "absolute", "z-index": "20" })
    $('.rangee').css("text-align", "center");
    $('.case').css("width", "10%");
    $('.choice').css("width", "70px");
    $('.felin1').css({ "width": "50%" });
    $('.felin2').css({ "width": "50%", "display": "inline-block", "transform": "scaleX(-1)", "z-index": "10" });
    $('video').css("autoplay","playsinline");
    $(".choice").click(function () {
        if (PlayerChoice == 0) {
            selection = $(this).attr('cbt');
            playerOne = selection;
            $('.felin1').attr("src", "https://puissance4.cet1bot.app/public/images/main" + selection + ".png")
        }

        if (PlayerChoice == 1 && $(this).attr('cbt') != playerOne) {
            selection = $(this).attr('cbt');
            playerTwo = selection;
            $('.felin2').attr("src", "https://puissance4.cet1bot.app/public/images/main" + selection + ".png")
        }
    })
    $("#confirm").click(function () {
        if (selection !== 0 && PlayerChoice == 0) {
            selection = 0;
            PlayerChoice = 1;
            $('p').text("PLAYER TWO");
            $('#confirm').text("START J2");
            $("img[cbt=" + playerOne + "]").css("filter", "grayscale(1)");
        }
        if (selection !== 0 & PlayerChoice == 1) {
            PlayerChoice = 2
            selection = 0;
            $('h1').text("SCORE");
            $('p').text("PLAYER ONE 0 - 0 PLAYER TWO");
            $('#confirm').text("RELOAD");
            $("img[cbt=" + playerTwo + "]").css("filter", "grayscale(1)");
            $(".felin2").css("filter", "grayscale(1)");
            open = true;
        }
        if (PlayerChoice == 2) {
            $("img[function='play']").attr("src", "https://puissance4.cet1bot.app/public/images/vide.png");
            $(".felin1").css("filter", "grayscale(0)");
            $(".felin2").css("filter", "grayscale(1)");
            tableau();
            open = true;
            player = 1;
        }
    });

    let interval = animation;
    $("img[function='play']").click(function () {
        if (open) {
            play_x = $(this).attr('x');
            play_y = play($(this).attr('x'), player);
            if (player == 1 && play_y != "Stop") {
                i = y - 1;
                descente = window.setInterval(interval, 50);
            } else if (player == 2 && play_y != "Stop") {
                i = y - 1;
                descente = setInterval(interval, 50);
            }
        }
    });
    return;
}
    $("#victory").click(function(){
        document.getElementById('victory').play();
    });

$("#puissance4").puissance4(7, 6);