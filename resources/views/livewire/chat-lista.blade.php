<div class="container">
  <div class="row" style="margin-top: 20px; margin-bottom: 40px">
    <div class="col-6 overflow-scroll" style="height: 100%;"><br>
      @foreach ($datos as $mensaje)

        <div class="card mb-3">
            <div class="card-body">
                <p class="card-text">De tu servicio: {{ $mensaje->servicio }}</p>
                <div class="row">
                    <div class="col-6 text-truncate pt-1">
                        <strong>{{ $mensaje->IntermediateUser->name}}:</strong> {{ $mensaje->mensaje }}
                    </div>
                    <div class="col-6">
                        <button class="btn btn-success btn-sm btn-block"
                            wire:click="responderM({{ $mensaje->IntermediateUser->id}}, {{ $mensaje->id_servicio }})">
                            Ver mensajes
                        </button>
                    </div>
                </div>
            </div>
        </div>
      @endforeach
    </div>

    <div class="col-6 px-4 overflow-scroll" style="height: 100%;"><br>
    <div class="card">
        <div class="card-body" style="height: 60vh; overflow-y: auto;">
        @if($mensajes)
            @foreach ($mensajes as $hist)
                <div class="{{ $hist->envia == auth()->user()->id ?
                     'text-right bg-light-blue' :
                      'text-left bg-light-gray' }} mb-2 rounded p-2">
                    <p style="{{ $hist->envia == auth()->user()->id ? 'background-color: #007bff;
                          border-radius: 1rem;
                          padding: 5px 5px 5px 5px;
                          color: white;
                          margin-bottom: 0px;' : 'background-color: #ddd;
                          border-radius: 1rem;
                          padding: 5px 5px 5px 5px;
                          width: fit-content;' }}">{{ $hist->mensaje }}</p>
                    @if($hist->envia != auth()->user()->id)
                        <small class="text-muted">
                            {{ $hist->IntermediateUser->name }} - {{ $hist->created_at->format('d/m/Y H:i') }}
                        </small>
                    @else
                        <small class="text-muted">{{ $hist->created_at->format('d/m/Y H:i') }}</small>
                    @endif
                </div>
            @endforeach
        @endif
        </div>
        <div class="card-footer">
            @if($habilitarInput)
                <div class="row justify-content-center">
                    <div class="col-8 pr-1">
                        <input class="form-control form-control my-1 pr-0 inputChat"
                        wire:keydown.enter="enviarRespuesta" type="text" placeholder="Escribir" wire:model="respuesta">
                    </div>
                    <div class="col-4 pl-0" >
                        <button class="btn btn-success btn-block" wire:click="enviarRespuesta">Enviar</button>
                    </div>
                </div>
            @else
                <input class="form-control form-control-lg m-1 inputChat" wire:keydown.enter="enviarRespuesta"
                    type="text" placeholder="Escribir" disabled>
            @endif
        </div>
    </div>
</div>
  </div>
</div>

<script>
    
    Pusher.logToConsole = true;
    var pusher = new Pusher('0cceeee491b92f68de44', {
    cluster: 'mt1'
    });
    var channel = pusher.subscribe('chat-channel');
    channel.bind('chat-event', function(data) {
        // alert(JSON.stringify(data));
        Livewire.emit('llegadaMensaje');
        app.messages.push(JSON.stringify(data));
    });
</script>
