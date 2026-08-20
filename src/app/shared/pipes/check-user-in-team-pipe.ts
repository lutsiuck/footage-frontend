import { Pipe, PipeTransform } from '@angular/core';
import { ITeamMembers } from '../models/team.model';

@Pipe({
  name: 'checkUserInTeam',
})
export class CheckUserInTeamPipe implements PipeTransform {
  transform(members: ITeamMembers[], userId: string): boolean {
    return members.some((member) => member.user?.id === userId);
  }
}
