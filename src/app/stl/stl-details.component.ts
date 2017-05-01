import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {StlService} from '../stl.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
    selector: 'app-stl-details',
    templateUrl: './stl-details.component.html',
    styleUrls: ['./stl-details.component.css']
})

export class StlDetailsComponent implements OnInit, OnDestroy {
    stl: any;
    comment: string;
    error: string;
    success: boolean;
    user: any;
    private id: any;
    private sub: any;

    constructor(private authenticationService: AuthenticationService, private stlService: StlService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.user = this.authenticationService.currentUser;
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.stlService.getStl(this.id).subscribe(stl => {
            this.stl = stl;
        });
    }

    ngOnDestroy() {
        this.stl.unsubscribe();
    }

    addComment() {
        this.stlService.addComment(this.stl._id, this.comment).subscribe(result => {
            if (result.stl) {
                this.stl = result.stl;
                this.success = true;
            } else {
                this.error = result.error;
            }
        });
    }
};
