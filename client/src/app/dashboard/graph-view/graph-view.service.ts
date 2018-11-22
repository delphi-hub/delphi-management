import {Injectable} from '@angular/core';
import {SocketService} from '../../api/api/socket.service';
import {ApiService} from '../../api/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GraphViewService {

  constructor(private socketService: SocketService, private apiService: ApiService) {
  }
}
