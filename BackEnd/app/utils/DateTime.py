import datetime


def camparedDate(dateIndex):
    if dateIndex == 0:
        return datetime.date.today()
    else:
        return datetime.date.today()-datetime.timedelta(days=int(dateIndex))
