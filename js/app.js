$(function () {
    $("#form1").submit(function (event) {
        if ($("#campoEmail").val()) {
            var $form = $(this);

            serializedData = $form.serialize();
            $inputs = $form.find("input, select, button, textarea");

            // let's disable the inputs for the duration of the ajax request
            $inputs.attr("disabled", "disabled");
            $("#contatoFormulario").hide();

            $("#contatoMensagem").html(loadingContent());
            $("#contatoMensagem").show();

            $.ajax({
                url: "http://erloncabral.net/api/contact",
                type: "post",
                data: serializedData,
                success: function (response, textStatus, jqXHR) {
                    $("#contatoMensagem").html(successContent());
                    $("#contatoMensagem").show();

                    console.log("Hooray, it worked!");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#contatoMensagem").html(errorContent());
                    $("#contatoMensagem").show();

                    console.log("The following error occured: " + textStatus, errorThrown);

                    setTimeout(function () {
                        $("#contatoMensagem").hide();
                        $("#contatoFormulario").show();
                    }, 3000);
                },
                complete: function () {
                    // enable the inputs
                    $inputs.removeAttr("disabled");
                }
            });
        }

        // prevent default posting of form
        event.preventDefault();
    });

    function successContent() {
        return "<img src='images/icoTks.png' alt='Thanks!' /><p class='textoSucesso'>Thank you! Soon we will send you<br />some news from the front!</p>";
    }

    function loadingContent() {
        return "<img src='images/image_362485.gif' alt='Sending...' /><p class='textoInfo'>Sending...</p>";
    }

    function errorContent() {
        return "<p class='textoInfo'>Ooops! Something did not work<br />make sure you provide a valid email address!</p>";
    }
});