import { BaseOut } from '../baseOut';

export class DeletePacienteOut extends BaseOut {
    public $type: string = "PruebaNexos.MethodParameters.Paciente.DeletePacienteOut, PruebaNexos";
    public pacienteId: number;
}