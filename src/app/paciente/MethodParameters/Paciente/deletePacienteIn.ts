import { BaseIn } from '../baseIn';

export class DeletePacienteIn extends BaseIn {     
    public $type: string = "PruebaNexos.MethodParameters.Paciente.DeletePacienteIn, PruebaNexos";   
    
    public pacienteId: number;    
}
