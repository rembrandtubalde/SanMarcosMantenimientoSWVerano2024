<div class="row" style="margin-top: 40px; margin-bottom: 40px;">
    <div class="col-4">
        <div style="text-align: center">

            <br><h5>Precio S/</h5><br>
            <div>
                @error('precio')
                    <span class="badge badge-danger">{{ $message }}</span>
                @enderror
                <div class=""><input type="text" class="" name="precio" wire:model="precio"></div>
            </div>
            <div class="mb-3" style="margin-top: 20px; margin-bottom: 20px;">
                <div style="text-align: left; margin-left: 120px;">
                    <p>Ocupaciones:</p>
                </div>
                <select class="desplegable" style="width: 50%" wire:model="ocupacion" wire:click="ocupacionM">
                <option value="" disabled selected>-- Seleccione una ocupación --</option>
                    @if ($serviciosTec->count() > 0)
                        @foreach ($serviciosTec as $item)
                            <option value= {{$item->id}}>{{$item->ser_occ_name}}</option>
                        @endforeach
                    @endif
                </select>
            </div>
            <div class="mb-3" style="margin-top: 20px; margin-bottom: 20px;">
                <div style="text-align: left; margin-left: 120px;">
                    <p>Talentos:</p>
                </div>
                <select class="desplegable" style="width: 50%" wire:model="talento" wire:click="talentoM">
                <option value="" disabled selected>-- Seleccione un Talento --</option>
                @if ($serviciosTal->count() > 0)
                        @foreach ($serviciosTal as $item)
                            <option value= {{$item->id}}>{{$item->ser_tal_name}}</option>
                        @endforeach
                    @endif
                </select>
            </div>
        </div>
    </div>

    <div class="col-8 text-left my-2">
        <h3>Filtro de servicios:</h3><br>
        @if($datos->count())
            <h4>Resultados para: {{ $tipo }}</h4><br>
            @foreach($datos as $dato)
                @if($talento)
                    <div class="row mt-2">
                        <div class="col-4">
                            <img alt="Imagen de servicio" class="img-fluid"  src="{{ $dato->imagen}}">
                        </div>
                        <div class="col-7 text-left">
                            <p>Descripcion: {{ $dato->descripcion}}</p>
                            <p>Precio: {{ $dato->precio}} S/</p>
                            <a class="btn btn-success my-1" href="{{ route('showProfileServiceTalent',$dato->id) }}">Ir a servicio</a>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    
                    
                @elseif($ocupacion)
                    <div class="row mt-2">
                        <div class="col-4">
                            <img alt="Imagen de servicio" src="{{ $dato->imagen}}">
                        </div>
                        <div class="col-7 text-left">
                            <p>Descripcion: {{ $dato->descripcion}}</p>
                            <p>Precio: {{ $dato->precio}} S/</p>
                            <a class="btn btn-success my-1" href="{{ route('showProfileServiceOccupation',$dato->id) }}">Ir a servicio</a>
                        </div>
                        <div class="col-1"></div>
                    </div>
                @endif
            @endforeach
        @else
            <p></p>
        @endif
    </div>
</div>