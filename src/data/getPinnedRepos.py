from __future__ import division
from bs4 import BeautifulSoup
import requests
import json
import os
import dateutil.parser as dp


# defaults
USERNAME_SEARCH = 'josuerojasrojas'
GIT_API_USERNAME_SEARCH = 'josuerojasrojas'
GIT_TOKEN = os.environ['gittoken']

# fetch html and return links that are pinned
def getPinnedNames():
    r = requests.get('https://github.com/'+USERNAME_SEARCH).content
    soup = BeautifulSoup(r)
    containers = soup.find_all('div', {'class': 'pinned-repo-item-content'})
    pinnedLinks = []
    for container in containers:
        # print container.a.get('href')
        pinnedLinks.append(container.a.get('href'))
    return pinnedLinks

# fetch repo information
# NOTE: repo should be '/:owner/:repo'
def getRepoInfo(repo):
    return requests.get('https://api.github.com/repos'+repo, auth=(GIT_API_USERNAME_SEARCH, GIT_TOKEN)).json()

def main():
    pinnedLinks = getPinnedNames()
    repoDATA = []
    for repo in pinnedLinks:
        repoDATA.append(getRepoInfo(repo))
    with open('PINNED_REPOS.json','w') as jsonfile:
        json.dump({'pinned_repos':repoDATA}, jsonfile)

main()
