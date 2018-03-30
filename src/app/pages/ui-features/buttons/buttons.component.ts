import { Component, OnInit, HostListener } from '@angular/core';
import {
  AccessibilityConfig, Action, AdvancedLayout, ButtonEvent, ButtonsConfig, ButtonsStrategy, ButtonType, Description, DescriptionStrategy,
  DotsConfig, GridLayout, Image, ImageModalEvent, LineLayout, PlainGalleryConfig, PlainGalleryStrategy, PreviewConfig
} from 'angular-modal-gallery';
import * as $ from 'jquery';

@Component({
  selector: 'ngx-buttons',
  styleUrls: ['./buttons.component.scss'],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 600) {
      this.plainGalleryGrid.layout['size'].width = '50px';
      this.plainGalleryGrid.layout['size'].height = '50px';
      console.log(this.plainGalleryGrid.layout['size']);
    }
  }

  ngOnInit() { }

  customPlainGalleryRowConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  customPlainGalleryColumnConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  plainGalleryRow: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: new LineLayout({ width: '80px', height: '80px' }, { length: 2, wrap: true }, 'flex-start')
  };
  plainGalleryRowSpaceAround: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: new LineLayout({ width: '50px', height: '50px' }, { length: 2, wrap: true }, 'space-around')
  };
  plainGalleryRowATags: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.ROW,
    layout: new LineLayout({ width: '100px', height: '100px' }, { length: 6, wrap: true }, 'flex-start'),
    // when advanced is defined, additionalBackground: '50% 50%/cover' will be used by default.
    // I added this here, to be more explicit.
    advanced: { aTags: true, additionalBackground: '50% 50%/cover' }
  };

  plainGalleryColumn: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.COLUMN,
    layout: new LineLayout({ width: '50px', height: '50px' }, { length: 3, wrap: true }, 'flex-start')
  };

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '200px', height: '200px' }, { length: 4, wrap: true })
  };

  images_1: Image[] = [
    new Image(
      0,
      { // modal
        img: 'http://www.tribuneindia.com/2003/20030514/chd4.jpg',
        extUrl: 'http://www.google.com'
      }
    ),
    new Image(
      1,
      { // modal
        img: 'http://www.drsunalidentalsolutions.com/resize/1376370924_photo-1.JPG',
        description: 'Description 2'
      }
    ),
    new Image(
      2,
      { // modal
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/eye-camps.jpg',
        description: 'Description 3',
        extUrl: 'http://www.google.com'
      },
      { // plain
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/eye-camps.jpg'
      }
    ),
    new Image(
      3,
      { // modal
        img: 'http://www.heritagehousedental.ca/news/wp-content/uploads/2017/10/summer-camps-3.jpg',
        description: 'Description 4',
        extUrl: 'http://www.google.com'
      }
    ),
    new Image(
      4,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    ),
    new Image(
      5,
      { // modal
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      },
      { // plain
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      }
    ),
    new Image(
      6,
      { // modal
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      },
      { // plain
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      }
    ),
    new Image(
      7,
      { // modal
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      },
      { // plain
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      }
    ),
  ];
  images_2: Image[] = [
    new Image(
      0,
      { // modal
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      },
      { // plain
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      }
    ),
    new Image(
      1,
      { // modal
        img: 'http://www.myoxigen.com/CSR/csr_camp_2015/dental_camps/Dental-camp-03.jpg'
      },
      { // plain
        img: 'http://www.myoxigen.com/CSR/csr_camp_2015/dental_camps/Dental-camp-03.jpg'
      }
    ),
    new Image(
      2,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    )
    ,
    new Image(
      3,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    ),
    new Image(
      4,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    )
    ,
    new Image(
      5,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    ),
    new Image(
      6,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    )
    ,
    new Image(
      7,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    )
  ];
  images_3: Image[] = [
    
    new Image(
      0,
      { // modal
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      },
      { // plain
        img: 'http://www.djjs.org/aarogya/uploads/thumbnail/blood-donation-camps.jpg'
      }
    ),
    new Image(
      1,
      { // modal
        img: 'http://www.myoxigen.com/CSR/csr_camp_2015/dental_camps/Dental-camp-03.jpg'
      },
      { // plain
        img: 'http://www.myoxigen.com/CSR/csr_camp_2015/dental_camps/Dental-camp-03.jpg'
      }
    ),
    new Image(
      2,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    )
    ,
    new Image(
      3,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    ),
    new Image(
      4,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    )
    ,
    new Image(
      5,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    ),
    new Image(
      6,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    ),
    new Image(
      7,
      { // modal
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      },
      { // plain
        img: 'https://images.livehindustan.com/uploadimage/library/2017/11/03/16_9/16_9_1/HH_ROK4RRK5_1509711019_1509711019.JPG'
      }
    )
  ];

  imagesRect: Image[] = [
    new Image(
      0,
      { // modal
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/milan-pegasus-gallery-statue.jpg',
        description: 'Description 1'
      },
      { // plain
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/thumbs/t-milan-pegasus-gallery-statue.jpg'
      }
    ),
    new Image(
      1,
      { // modal
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/pexels-photo-47223.jpeg'
      },
      { // plain
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-47223.jpg'
      }
    ),
    new Image(
      2,
      { // modal
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/pexels-photo-52062.jpeg',
        description: 'Description 3'
      },
      { // plain
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-52062.jpg',
        description: 'Description 3'
      }
    ),
    new Image(
      3,
      { // modal
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/pexels-photo-66943.jpeg',
        description: 'Description 4'
      },
      { // plain
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-66943.jpg'
      }
    ),
    new Image(
      4,
      { // modal
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/pexels-photo-93750.jpeg'
      },
      { // plain
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-93750.jpg'
      }
    ),
    new Image(
      5,
      { // modal
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/pexels-photo-94420.jpeg',
        description: 'Description 6'
      },
      { // plain
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-94420.jpg'
      }
    ),
    new Image(
      6,
      { // modal
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/pexels-photo-96947.jpeg'
      },
      { // plain
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-96947.jpg'
      }
    )
  ];

}
