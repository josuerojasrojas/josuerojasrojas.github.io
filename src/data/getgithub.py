from __future__ import division
from bs4 import BeautifulSoup
import requests, json, os
import dateutil.parser as dp
# TODO: repos that change name are not appearing (might take some time or something wrong, either way its time to investigate)

'''
this script is to get github public projects with their info.
modidfied to only get pinned repos
'''

USERNAME_SEARCH = 'josuerojasrojas'


def getPinnedNames():
    r = requests.get('https://github.com/'+USERNAME_SEARCH).content
    soup = BeautifulSoup(r)
    span = soup.find_all('span', {'class': 'repo js-repo'})
    pinnedLinks = []
    for text in span:
        pinnedLinks.append(text.get_text())
    return pinnedLinks

def getSearchablelanguages():
    r = requests.get('https://github.com/'+USERNAME_SEARCH+'?tab=repositories').content
    soup = BeautifulSoup(r)
    container = soup.find_all('div', {'class': 'select-menu d-inline-block js-menu-container js-select-menu select-menu-modal-right'})[1].find_all('span', {'class':'select-menu-item-text js-select-button-text'})#should be the second one...
    langs = []
    for input in container:
        langs.append(input.get_text())
    return langs

findList = getPinnedNames() #repos to find
user = 'josuerojasrojas'
basicInfo = requests.get('https://api.github.com/users/'+user,auth=('josuerojasrojas',os.environ['gittoken'])).json()
repos = requests.get('https://api.github.com/users/'+user+'/repos',auth=('josuerojasrojas',os.environ['gittoken'])).json()
allLanguages = getSearchablelanguages()


def languagePercent(langs):
    total = 0
    for language in langs.keys():
        total+= langs[language]
        # allLanguages.add(language) #this should be more locally scope but this works fine for now
    for language in langs.keys():
        langs[language] = (langs[language]/total) * 100
    return langs

# i am sure there is a better way to filter the data
# ill do that later
def getInfo():
    repoNames = []
    htmlURL = []
    repoDesc = []
    createAt = []
    languages = []
    projectLink = []
    languagesList= []
    datevalue = []
    for repo_name in findList:
        repo = requests.get('https://api.github.com/repos/'+user+'/'+repo_name,auth=('josuerojasrojas',os.environ['gittoken'])).json()
        print repo
        languagesInfo = languagePercent(requests.get(repo['languages_url'],auth=('josuerojasrojas',os.environ['gittoken'])).json()) if repo['languages_url'] else []
        repoNames.append(repo['name'] if repo['name'] else '')
        htmlURL.append(repo['html_url'] if repo['html_url'] else '')
        repoDesc.append(repo['description'] if repo['description'] else '')
        createAt.append(repo['created_at'] if repo['created_at'] else '')
        datevalue.append(dp.parse(repo['created_at']).strftime('%s') if repo['created_at'] else '')
        languages.append(languagesInfo)
        languagesList.append(languagesInfo.keys())
        projectLink.append(repo['homepage'] if repo['homepage'] else '#')
    return repoNames, htmlURL, repoDesc, createAt, languages,languagesList, projectLink, datevalue

# this returns a json object (how i wanted)
# getInfo() should be run first to get allLanguages
def organizeData(repoNames, htmlURL, repoDesc, createAt, languages,languagesList, projectLink, datevalue, allLanguages=allLanguages):
    # make each repo json
    repoJson = []
    for i in range(len(repoNames)):
        repoJson.append({
        'repo_name': repoNames[i],
        'url': htmlURL[i],
        'description': repoDesc[i],
        'languages': languages[i],
        'languagesList': languagesList[i],
        'created': createAt[i],
        'projectLink': projectLink[i],
        'datevalue': datevalue[i]
        })
    dataJson = {
        'fullname': basicInfo['name'],
        'username': user,
        'avatar_url': basicInfo['avatar_url'],
        'languages':list(allLanguages),
        'repos': repoJson
    }
    return dataJson

def main():
    repoNames, htmlURL, repoDesc, createAt, languages, languagesList, projectLink, datevalue = getInfo()
    with open('data.json','w') as jsonfile:
        json.dump(organizeData(repoNames, htmlURL, repoDesc, createAt, languages,languagesList, projectLink, datevalue), jsonfile)
    os.chdir(os.getcwd())
    # os.system('cd '+ os.getcwd()+ '; json2yaml data.json > data.yml') #it's easier to use so i've heard, plus it looks pretty

main()
