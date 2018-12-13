import { sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild } from '@angular/animations';

export const fadeAnimation =
  trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', style({ transform: 'translateX(0)' }),
      { optional: true }),
    sequence([
      group([
        query(':leave', [
          style({ transform: 'translateX(0)', opacity: '0' }),
          animate('300ms',
            style({ transform: 'translateX(0)', opacity: '0' }))
        ],
          { optional: true }),
        query(':enter', [
          style({ transform: 'translateX(0)', opacity: '0' }),
          animate('300ms',
            style({ transform: 'translateX(0)', opacity: '1' })),
        ],
          { optional: true })
      ])
    ])
  ])
]);