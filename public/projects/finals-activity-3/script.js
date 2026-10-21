// Activity 3: jQuery
$(document).ready(function () {
    $("th").css("background", "burlywood")

    // Profile buttons
    $("#btn").click(function () {
        $("#title h1").text("Hello, jQuery!")
        $("#message").text("You changed the title!")
    })

    $("#btn2").click(function () {
        $(".card").hide("slow")
        $("#message").text("Profile hidden")
    })

    $("#btn3").click(function () {
        $(".card").show("slow")
        $("#message").text("Profile shown")
    })

    // Course dropdown
    $("#courseselect").change(function () {
        $("#message").text("You selected: " + $(this).val())
    })

    // Table buttons
    $("#buttonodd").click(function () {
        $("tbody tr:nth-child(odd)").css("background", "lightblue")
        $("#message2").text("Odd rows applied")
    })

    $("#buttoneven").click(function () {
        $("tbody tr:nth-child(even)").css("background", "lightgreen")
        $("#message2").text("Even rows applied")
    })

    $("#tablehide").click(function () {
        $("table").hide("slow")
        $("#message2").text("Table hidden")
    })

    $("#tableshow").click(function () {
        $("table").show("slow")
        $("#message2").text("Table shown")
    })
})
