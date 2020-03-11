(function ($) {

    $(document).ready(function () {

        const url = window.location.protocol + '//' + window.location.hostname + ':3000'
        console.log('url', url )

        const removeData = function () {
            let id = $(this).data('id')
            let url = url + '/bills/' + id
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (result) {
                    listData()
                }
            })
        }

        const createData = function () {
            let title = $('input[name=title]').val()
            let price = $('input[name=price]').val()
            let category = $('#select_category').val()
            let cep = $('input[name=cep]').val()

            if (!title || !price || !category) {
                console.log('Dados inválidos!')
                return
            }

            $.post(url + '/bills/', { title: title, price: price, category: category, cep: cep }, function (result) {
                console.log(result)

                $('input[name=title]').val('')
                $('input[name=price]').val('')
                $('#select_category').val('')
                $('input[name=cep]').val('')
                listData()
            })
        }

        const listData = function () {
            $.get(url + '/bills/', function (result) {

                if (!result.data.length && !result.status) {
                    return;
                }

                $('#list_table tbody').empty()
                result.data.forEach(function (bill) {
                    tmpl = '<tr>' +
                        '<td>' + bill.title + '</td>' +
                        '<td>' + bill.price + '</td>' +
                        '<td><a href="' + url + '/address/' + bill.cep + '" target="_blank">' + bill.cep + '</a></td>' +
                        '<td><button type="button" class="btn_delete btn btn-danger btn-small" data-id="' + bill._id + '">Excluir</button></td>' +
                        '</tr>';
                        $('#list_table tbody').append(tmpl)
                })
            })
        }

        const populateCaterory = function () {
            $.get(url + '/categories/', function (result) {

                if (!result.data.length && !result.status) {
                    return;
                }

                result.data.forEach(function (category) {
                    tmpl = '<option value=' + category._id + '>' + category.name + '</option>'
                    $('#select_category').append(tmpl)
                })
            })
        }

        const createDataCat = function () {
            let name = $('input[name=name]').val()

            if (!name) {
                console.log('Dados inválidos!')
                return
            }

            $.post(url + '/categories/', { name: name }, function (result) {
                console.log(result)

                $('input[name=name]').val('')
            })
        }

        listData()
        populateCaterory()
        $('#btn_create').on('click', createData)
        $('#list_table tbody').on('click', '.btn_delete', removeData)
        $('#btn_create_cat').on('click', createDataCat)
    })
})(jQuery)