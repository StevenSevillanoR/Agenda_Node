
class EventManager {
    constructor() {
        this.urlBase = "/event"
        this.obtenerDataInicial()
        //this.inicializarFormulario()
        this.guardarEvento()
        //this.inicializarCalendario()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/allEvents"
            //eventos = null
        console.log(url, "Ingrese")
        //this.inicializarCalendario(eventos)
        $.get(url, (response) => {
            console.log(response, response.message, response.doc, response.err)
            if(response.session == "Error"){
              alert('Inicie sesión')
              window.location.href = 'index.html'
            }else{
                if (response == null || !response) {
                  console.log("Sin eventos")
                  this.inicializarCalendario()
                } else {
                  console.log("Con eventos")
                  this.inicializarCalendario(response.doc)
                }
                //alert(response.message)
            }
            
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()

          let eventos = $('.calendario').fullCalendar('getEventSources')
            console.log(eventos)
                //idEvento = $('#titulo').val(),
            let start = $('#start_date').val(),
                title = $('#titulo').val(),
                end = '',
                start_hour = '',
                end_hour = '',
                fullday = ''

            if (!$('#allDay').is(':checked')) {
              end_hour = $('#end_hour').val()  
              start_hour = $('#start_hour').val()
              if(end_hour == null || end_hour == ""){
                end = $('#end_date').val()
              }else{
                end = $('#end_date').val() + 'T' + end_hour + 'Z'
              }
              if (start_hour == null || start_hour == "") {
                start = start
              } else {
                start = start + 'T' + start_hour + 'Z'
              }              
              fullday = '0';
            }else{
              fullday = '1';
            }

            console.log(title, start, end, start_hour, end_hour, fullday)

            let url = this.urlBase + "/addEvent"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    start_hour: start_hour,
                    end_hour: end_hour,
                    fullday: fullday
                }

              console.log(url, ev)

                $.post(url, ev, (response) => {
                  let eve = {
                    title: title,
                    start: start,
                    end: end 
                  }            
                  console.log(response, response.message, response.evento)
                  $('.calendario').fullCalendar('renderEvent', ev)
                  alert("Evento añadido correctamente")
                })
              window.location.reload()
               
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    eliminarEvento(evento) {
      console.log(evento)
      let url = this.urlBase + "/delete/"
      let eventId = evento._id
      console.log(eventId)
      $.post(url, { id: eventId }, (response) => {
        console.log(response)
        alert(response.message)
        window.location.href = "main.html"
      })
    }

    actualizarEvento(evento) {
      console.log(evento)
      let url = this.urlBase + "/update/"
      let eventos = {}

      if (evento.end === null) {
        var start = moment(evento.start).format('YYYY-MM-DD'),
            end = null
        eventos = {
          _id: evento._id,
          start: start,
          end: end
        }
        console.log(start, end)
      } else {
        var start = moment(evento.start).format('YYYY-MM-DD'),
            end = moment(evento.end).format('YYYY-MM-DD')
        eventos = {
          _id: evento._id,
          start: start,
          end: end,
          start_hour: evento.start_hour,
          end_hour: evento.end_hour 
        }
        console.log(start, end)
      }

      console.log(url, eventos)

      $.post(url, eventos, (response)=>{
        console.log(response)
        alert(response.message)
        window.location.reload()
      })
    }

    inicializarCalendario(eventos) {
      console.log(eventos)
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            //defaultDate: '2016-11-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
              $('.delete').find('img').attr('src', "../img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event._id);
                }
                $('.delete').find('img').attr('src', "../img/delete.png");
                $('.delete').css('background-color', '#a70f19')
                }
            })
        }
    }

    const Manager = new EventManager()

    $(function(){
      inicializarFormulario();
      //Manager.obtenerDataInicial();
    });

    function inicializarFormulario() {
      $('#start_date, #titulo, #end_date').val('');
      $('#start_date, #end_date').datepicker({
        dateFormat: "yy-mm-dd"
      });
      $('.timepicker').timepicker({
        timeFormat: 'HH:mm:ss',
        interval: 30,
        minTime: '5',
        maxTime: '23:59:59',
        defaultTime: '',
        startTime: '5:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
      });
      $('#allDay').on('change', function () {
        if (this.checked) {
          $('.timepicker, #end_date').attr("disabled", "disabled")
        } else {
          $('.timepicker, #end_date').removeAttr("disabled")
        }
      })
    }

function cerrarSesion() {
    $.ajax({
      url: 'users/logout',
      dataType: "text",
      cache: false,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function () {
        alert("Saliendo")
        window.location.href = 'http://localhost:8082/index.html';
      },
      error: function () {
        alert("error en la comunicación con el servidor !!!");
      }
    })
}