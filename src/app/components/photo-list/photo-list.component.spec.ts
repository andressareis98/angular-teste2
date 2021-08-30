import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotoListModule } from './photo-list.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';
import { of } from 'rxjs';

function buildPhotoList(): Photo[] {
  const photos: Photo[] = [];
  for (let i = 0; i < 8; i++) {
    photos.push({
      id: i + 1,
      url: '',
      description: '',
    });
  }
  return photos;
}

describe(PhotoListComponent.name, () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService);
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, () => {
    const photos = buildPhotoList();
    spyOn(service, 'getPhotos').and.returnValue(of(photos));
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).not.toBeNull();
    expect(loader).toBeNull();
  });

  it(`(D) Should display loader while waiting for data`, () => {
    spyOn(service, 'getPhotos').and.returnValue(of(null));
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(loader).not.toBeNull();
    expect(board).toBeNull();
  });
});
