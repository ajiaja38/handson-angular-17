import { IClass, IClassData, ITodo, MasterService } from './master.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('MasterService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: MasterService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj(['HttpClient', 'get', 'post']);
    service = new MasterService(httpClientSpy); //mock
  });

  it('Should get todo with param 1', (done) => {
    const expected: ITodo = {
      userId: 1,
      id: 1,
      title: 'electus aut autem',
      completed: false,
    };

    httpClientSpy.get
      .withArgs('https://jsonplaceholder.typicode.com/todos/1')
      .and.returnValue(of(expected));

    service.getTodos(1).subscribe({
      next: (data) => {
        expect(data).toEqual(expected);
        done();
      },
      error: (error) => {
        console.log(error);
      },
    });
  });

  it('should be created Data Class', () => {
    const dataPost: IClass = {
      name: 'test',
      class: 'test',
    };

    const expected: IClassData = {
      name: 'test',
      class: 'test',
      id: 101,
    };

    const expected2: IClassData = {
      name: 'test',
      class: 'test',
      id: 101,
    };

    httpClientSpy.post
      .withArgs('https://jsonplaceholder.typicode.com/posts', dataPost)
      .and.returnValue(of(expected));

    service.postClass(dataPost).subscribe({
      next: (data) => {
        console.log(data);
        expect(expected2).toEqual(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  });
});
