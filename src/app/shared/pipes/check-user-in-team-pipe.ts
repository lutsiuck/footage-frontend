import { Pipe, PipeTransform } from '@angular/core';
import { ITeamMembers } from '../models/team.model';

@Pipe({
  name: 'checkUserInTeam',
})
export class CheckUserInTeamPipe implements PipeTransform {
  transform(members: ITeamMembers[], userId: string, isCaptain?: boolean): boolean {
    if (isCaptain) {
      return members.some((member) => member?.role === 'captain' && member?.user_id === userId);
    }
    return members.some((member) => member?.user_id === userId);
  }
}
