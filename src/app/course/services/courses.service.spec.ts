import { CoursesService } from "./courses.service";

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { findLessonsForCourse } from 'server/db-data';


describe('CoursesService', () => {

    let coursesService: CoursesService,
        httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                CoursesService
            ]
        });

        coursesService = TestBed.get(CoursesService),
            httpTestingController = TestBed.get(HttpTestingController);

    });


    it('should find a list of lessons', () => {

        coursesService.findLessons(12)
            .subscribe(lessons => {

                expect(lessons).toBeTruthy();

                expect(lessons.length).toBe(3);

            });

        const req = httpTestingController.expectOne(
            req => req.url == '/api/lessons');

        expect(req.request.method).toEqual("GET");
        expect(req.request.params.get("courseId")).toEqual("12");
        expect(req.request.params.get("filter")).toEqual("");
        expect(req.request.params.get("sortOrder")).toEqual("asc");
        expect(req.request.params.get("pageNumber")).toEqual("0");
        expect(req.request.params.get("pageSize")).toEqual("3");

        req.flush({
            payload: findLessonsForCourse(12).slice(0, 3)
        });


    });

    afterEach(() => {

        httpTestingController.verify();
    });

});