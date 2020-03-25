import { BaseIn } from '../baseIn';

export class CreatePacienteIn extends BaseIn {     
    public $type: string = "PruebaNexos.MethodParameters.Paciente.CreatePacienteIn, PruebaNexos";   
    
    public Nombre: string;
    public NumeroSeguro: string;
    public MedicoPreferido: string;  
}
