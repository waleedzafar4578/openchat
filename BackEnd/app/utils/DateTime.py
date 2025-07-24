import datetime


def camparedDate(dateIndex):
    if dateIndex == 0:
        return None
    else:
        return datetime.date.today()-datetime.timedelta(days=int(dateIndex))
