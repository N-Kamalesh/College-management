CREATE TABLE IF NOT EXISTS public.students
(
    rollno integer NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    fullname text COLLATE pg_catalog."default" NOT NULL,
    mobile text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    gender character(1) COLLATE pg_catalog."default" NOT NULL,
    dob date NOT NULL,
    deptcode integer NOT NULL,
    sem integer NOT NULL,
    joinyear integer NOT NULL,
    CONSTRAINT students_pkey PRIMARY KEY (rollno),
    CONSTRAINT students_email_key UNIQUE (email),
    CONSTRAINT students_mobile_key UNIQUE (mobile)
);

CREATE TABLE IF NOT EXISTS public.announcements (
  announcement_id text PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  deptcode INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS public.staff
(
    staffid integer NOT NULL,
    fullname text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    mobile text COLLATE pg_catalog."default" NOT NULL,
    deptcode integer NOT NULL,
    highest_qualification text COLLATE pg_catalog."default" NOT NULL,
    designation text COLLATE pg_catalog."default" NOT NULL,
    joindate date NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    gender character(1) COLLATE pg_catalog."default",
    CONSTRAINT staff_pkey PRIMARY KEY (staffid),
    CONSTRAINT staff_email_key UNIQUE (email),
    CONSTRAINT staff_mobile_key UNIQUE (mobile)
);

CREATE TABLE IF NOT EXISTS public.department
(
    deptcode integer NOT NULL,
    deptname text COLLATE pg_catalog."default" NOT NULL,
    hod_id integer ,
    CONSTRAINT department_pkey PRIMARY KEY (deptcode),
    CONSTRAINT department_deptname_key UNIQUE (deptname)
);

CREATE TABLE IF NOT EXISTS public.marks
(
    courseid character(6) COLLATE pg_catalog."default" NOT NULL,
    rollno integer NOT NULL,
    attendance integer,
	  sem integer NOT NULL,
	  year integer NOT NULL,
    internals integer,
    externals integer,
	  total integer,
    grade varchar(2) COLLATE pg_catalog."default",
    CONSTRAINT marks_pkey PRIMARY KEY (courseid, rollno)
);

CREATE TABLE IF NOT EXISTS public.course
(
    courseid character(6) COLLATE pg_catalog."default" NOT NULL,
    coursename text COLLATE pg_catalog."default" NOT NULL,
    deptcode integer NOT NULL,
    credits integer NOT NULL,
    CONSTRAINT course_pkey PRIMARY KEY (courseid),
);

CREATE TABLE IF NOT EXISTS public.takes
(
    rollno integer NOT NULL,
    courseid character(6) COLLATE pg_catalog."default" NOT NULL,
    staffid integer NOT NULL,
    year integer NOT NULL,
    sem integer NOT NULL,
    CONSTRAINT takes_pkey PRIMARY KEY (rollno, courseid, staffid,year,sem)
);

CREATE TABLE IF NOT EXISTS public.teaches
(
    staffid integer NOT NULL,
    courseid character(6) COLLATE pg_catalog."default" NOT NULL,
    year integer NOT NULL,
    sem integer NOT NULL,
    deptcode integer NOT NULL,
    CONSTRAINT teaches_pkey PRIMARY KEY (staffid, courseid, year, sem,deptcode)
);

CREATE TABLE admin(
	email text PRIMARY KEY,
	password text NOT NULL,
	name text NOT NULL
);

INSERT INTO department VALUES
(101,'Mechanical Engineering',2001),
(102,'Information Technology',2002),
(103,'Computer Science and Engineering',2003),
(104,'Electrical and Electronics Engineering',2004),
(105,'Electronics and Communication Engineering',2005),
(106,'Civil Engineering',2006);

INSERT INTO staff VALUES
(2001,'Eren Yeager','eren@gmail.com','8610386049',101,'PhD in Mechanical Engineering','Professor','2002/10/15','$2a$10$k92sio4x6Wl9j7epk0U4Oumm2t4xj9RqNINb6xiol63d9feoxbeJO','M'),
(2002,'Mikasa Ackermann','mikasa@gmail.com','8610386050',102,'PhD in Deep Learning','Professor','2007/10/22','	$2a$10$djh2F9FGo.lFQb1M6i0kaeYfVXUo1tTqPnK2gBpGH7l70K4O7hhGG','F'),
(2003,'Levi Ackermann','levi@gmail.com','8610386051',103,'PhD in Data Mining','Professor','2003/11/01','$2a$10$4yxZ9dU/eapyQAHtCwBn4u8QcrFBNnxOhkXvm6AP02ubolzH.5TmW','M'),
(2004,'Annie Leonhart','annie@gmail.com','8610386052',104,'PhD in Electronics','Professor','1998/02/28','$2a$10$JXbsOtJbzbBOkhrVGnuqu.fFkyzeXnJ6hi3eQ6mFJO2o13zSJ1zyG','F'),
(2005,'Erwin Smith','erwin@gmail.com','8610386053',105,'PhD in Communicative technology','Professor','2010/12/22','$2a$10$WOC6/ocIzvVQTOOnLVlyqeTDqbhBQSSn7spI6TMZWgn9GqA.UFqAu','M'),
(2006,'Hange Zoe','hange@gmail.com','8610386054',106,'PhD in Civil Engineering','Professor','1994/04/23','$2a$10$yFCTQvWYWxgs0N/BIq/yOOyCPuNMQsSkhdDDU1mCZ0EAzMGp975FG','F');

INSERT INTO admin VALUES('admin@gmail.com','$2a$10$RCylE1aD5h7SWWWXlG0X.uwpoKf.GK7XqTFMZARZcgnwWhXpmWfSy','Monish');

ALTER TABLE public.staff
ADD CONSTRAINT staff_deptcode_fkey FOREIGN KEY (deptcode)
REFERENCES public.department(deptcode) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.students
ADD CONSTRAINT students_deptcode_fkey FOREIGN KEY (deptcode)
REFERENCES public.department(deptcode) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE public.course
ADD CONSTRAINT course_deptcode_fkey FOREIGN KEY (deptcode)
REFERENCES public.department(deptcode) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE public.marks
ADD CONSTRAINT marks_rollno_fkey FOREIGN KEY (rollno)
REFERENCES public.students(rollno) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.marks
ADD CONSTRAINT marks_courseid_fkey FOREIGN KEY (courseid)
REFERENCES public.course(courseid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.announcements
ADD CONSTRAINT announcements_deptcode_fkey FOREIGN KEY (deptcode)
REFERENCES public.department(deptcode) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE public.department
ADD CONSTRAINT department_hod_id_fkey FOREIGN KEY (hod_id)
REFERENCES public.staff(staffid) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE public.teaches
ADD CONSTRAINT teaches_staffid_fkey FOREIGN KEY (staffid)
REFERENCES public.staff(staffid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.teaches
ADD CONSTRAINT teaches_courseid_fkey FOREIGN KEY (courseid)
REFERENCES public.course(courseid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.teaches
ADD CONSTRAINT teaches_deptcode_fkey FOREIGN KEY (deptcode)
REFERENCES public.department(deptcode) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE public.takes
ADD CONSTRAINT takes_staffid_fkey FOREIGN KEY (staffid)
REFERENCES public.staff(staffid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.takes
ADD CONSTRAINT takes_courseid_fkey FOREIGN KEY (courseid)
REFERENCES public.course(courseid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.takes
ADD CONSTRAINT takes_rollno_fkey FOREIGN KEY (rollno)
REFERENCES public.students(rollno) ON DELETE CASCADE ON UPDATE CASCADE;



-- *****************  TRIGGER **********************

CREATE OR REPLACE FUNCTION update_announcement_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER announcement_updated_at_trigger
BEFORE UPDATE ON announcements
FOR EACH ROW
EXECUTE FUNCTION update_announcement_updated_at();





CREATE OR REPLACE FUNCTION insert_announcement()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  NEW.created_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER insert_announcement_trigger
BEFORE INSERT ON announcements
FOR EACH ROW
EXECUTE FUNCTION insert_announcement();




-- Triger to set semester whenever something is updated
CREATE OR REPLACE FUNCTION update_semester()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate the current year and month
  DECLARE
    current_year INTEGER;
    current_month INTEGER;
    joining_year INTEGER;
    sem INTEGER;
  BEGIN
    current_year := EXTRACT(YEAR FROM CURRENT_DATE);
    current_month := EXTRACT(MONTH FROM CURRENT_DATE);
    joining_year := NEW.joinyear;

    -- Calculate the semester based on current month and joining year
    IF current_month < 7 THEN
      sem := (current_year - joining_year) * 2;
    ELSE
      sem := (current_year - joining_year) * 2 + 1;
    END IF;

    -- Limit sem to a maximum of 8
    sem := LEAST(sem, 8);  -- Use LEAST function to set max value to 8

    -- Update the sem field
    NEW.sem := sem;

    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql;


-- Create a trigger to execute the update_semester function before insert or update on students table
CREATE OR REPLACE TRIGGER update_semester_trigger
BEFORE INSERT OR UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_semester();





CREATE OR REPLACE FUNCTION calculate_total_and_grade()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.internals IS NULL OR NEW.externals IS NULL THEN
    NEW.total := NULL;
    NEW.grade := NULL;
  ELSIF NEW.attendance IS NULL THEN
    NEW.total := NEW.internals + NEW.externals;
    NEW.grade := CASE
                   WHEN NEW.internals IS NULL OR NEW.externals IS NULL THEN NULL
                   ELSE 'I'
                 END;
  ELSE
    NEW.total := NEW.internals + NEW.externals;
    NEW.grade := CASE
                   WHEN NEW.attendance < 75 THEN 'SA'
                   WHEN NEW.total >= 90 THEN 'A'
                   WHEN NEW.total >= 80 THEN 'B'
                   WHEN NEW.total >= 70 THEN 'C'
                   WHEN NEW.total >= 60 THEN 'D'
                   WHEN NEW.total >= 50 THEN 'E'
                   ELSE 'F'
                 END;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_total_and_grade
BEFORE INSERT OR UPDATE ON marks
FOR EACH ROW
EXECUTE PROCEDURE calculate_total_and_grade();





CREATE OR REPLACE FUNCTION staff_delete_trigger()
RETURNS TRIGGER AS $$
DECLARE 
  full_name TEXT;
BEGIN
  -- Declare full_name variable before the SELECT statement
  full_name := '';  -- Initialize to an empty string

  -- Ensure proper $sql$ markers and indentation
  BEGIN
    SELECT staff.fullname INTO full_name
    FROM staff
    WHERE staff.staffid = OLD.staffid;

    EXCEPTION WHEN NO_DATA_FOUND THEN
      full_name := 'Unavailable';
      RAISE NOTICE 'Staff record not found for staff ID: %', OLD.staffid;  -- Log error message
  END;

  INSERT INTO announcements (title, content, deptcode, created_at)
  VALUES ('Staff Member Removed', CONCAT('Teacher ', full_name, ' (Staff ID: ', OLD.staffid, ') has been removed from the system.'), OLD.deptcode, now());
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER staff_delete_after
AFTER DELETE ON staff
FOR EACH ROW
EXECUTE PROCEDURE staff_delete_trigger();



CREATE OR REPLACE FUNCTION student_enrollment_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO marks(rollno, courseid, sem, year) 
  VALUES (NEW.rollno, NEW.courseid, NEW.sem, NEW.year);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER student_enrollment
AFTER INSERT ON takes
FOR EACH ROW
EXECUTE PROCEDURE student_enrollment_trigger();




CREATE OR REPLACE FUNCTION check_course_eligibility()
RETURNS TRIGGER AS $$
DECLARE
    expected_sem integer;
BEGIN
    -- Calculate the expected semester based on the joinyear and current year
    SELECT (NEW.year - joinyear) * 2 + 1 INTO expected_sem 
    FROM students 
    WHERE rollno = NEW.rollno;

    IF NEW.sem = expected_sem OR NEW.sem = expected_sem - 1 THEN
        IF EXISTS (
            SELECT 1
            FROM teaches t
            WHERE t.staffid = NEW.staffid
              AND t.courseid = NEW.courseid
              AND t.year = NEW.year
              AND t.sem = NEW.sem
              AND t.deptcode = (
                  SELECT deptcode 
                  FROM students 
                  WHERE rollno = NEW.rollno
              )
        ) THEN
            RETURN NEW;
        ELSE
            RAISE EXCEPTION 'Student is not eligible to take this course.';
        END IF;
    ELSE
        RAISE EXCEPTION 'Student is not eligible to take this course.';
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER check_course_eligibility_trigger
BEFORE INSERT ON takes
FOR EACH ROW
EXECUTE FUNCTION check_course_eligibility();



CREATE OR REPLACE FUNCTION check_teaches_sem_year_dept()
RETURNS TRIGGER AS $$
DECLARE
    staff_deptcode INTEGER;
BEGIN
    -- Get the department code of the staff member
    SELECT deptcode INTO staff_deptcode FROM staff WHERE staffid = NEW.staffid;

    -- Check if the staff member's join year is greater than the year specified in teaches
    IF (
        SELECT EXTRACT(YEAR FROM joindate) FROM staff WHERE staffid = NEW.staffid
    ) > NEW.year THEN
        RAISE EXCEPTION 'Staff member joined after the specified year.';
    END IF;

    -- Check if the semester falls within the range of 1 to 8
    IF NEW.sem NOT BETWEEN 1 AND 8 THEN
        RAISE EXCEPTION 'Invalid semester value.';
    END IF;

    -- Check if the department code of the staff member matches the department code of the course
    IF staff_deptcode <> (
        SELECT deptcode FROM course WHERE courseid = NEW.courseid
    ) THEN
        RAISE EXCEPTION 'Staff from other departments cannot teach a subject of a different department.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER check_teaches_sem_year_dept_trigger
BEFORE INSERT OR UPDATE ON teaches
FOR EACH ROW
EXECUTE FUNCTION check_teaches_sem_year_dept();


