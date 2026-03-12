backlog
- responsiveness double check

others
- page load animation? like fade in or something simple
- add github commit somewhere
- add date to chats check ai ui if they have, if not then decide if i want
- contact: see if i want to make avatar more responsive (but still keep bigger size since i like) + add resume to like the small icon links
- anime card (too much white space)
- there are other animes with notes "season 1 and 2" please update to separate
- help ui and content
- pls add like personal fav or masterpiece or idk tab sa spotify mga songs, naa sa tab sa top songs (last month, 6 months, all time, favs or idk) (medyo ako, multo, bubog, some olivia, bawat piyesa, sa'yo, iprapk, put to waste, hayaan) - slightly diff layout? or can be the same
    - maybe not as list like the other tabs, but more cards ish? have some space for personal comments? like a description, maybe even pop up modal
- implement caching for spotify api calls, maybe a cron job? or ill manually update a json file, this is for the top tracks, artists, genres
- update first user management, get the top endpoints result to work
- read docs https://developer.spotify.com/documentation/web-api/references/changes/march-2026
- make the album cover in the now playing bigger, so that occupy same length as the now playing text, dont change gap
- fix the now playing size when still fetching, since its not the same size when its done fetching (fix this so that clearner loading state for that component)
- for the hero section, make the greeting just fade in, no more type (maybe can help ensure that the width of the hero is fixed, since right now, it moves if the greeting is long)
- add short pause before the typing after I'm Yani - ... so that the greeting appears first, then the about me
- update the ui for /discovery, it feels very out of place for some parts
- please update ai prompt, since its giving wrong and weird information, and please make sure the response animation (for typing) in the chatbot the same when you do quick message vs actually from ai
- save state for tabs (projects, and other pages that have like state for selected tabs) maybe just in the url? so that like if i select all for the projects, and pick a project, then go back, it should still have that selected

chats
- add bisaya and tagalog chats make the topic actually appropriate for the language, these are more personal
- have around 4-6 chats
    - Gi tigididing ka sa manila?
        - oo lisod kaayo oy...
        - adjust
    - Kamusta buhay atenista
        - answer tagalog

content
- contents of chats, tech stack, about, more quick questions (and answers update), anime
- update photography - pics, maybe separate like photos like folders - maybe use carousel like pixcells
- update prompt sa chat to add about the cv/resume
- chat better ui, new message appear on top
- see if i want to use smaller avatar for mobile

chore
- check greetings, make sure can fit in mobile
- one liner, have max words, make it fitting to the desciption like im yani
- maybe dont type the greeting anymore, just like fade or simple 
- make in discovery - explore and convo, same like card color/design with the 2x2 in the home page
- make project carousel a link, make all as default

fixes
- ensure the chat at / and saved chats, the scroll is only in the chat area, but the whole page should not be scrollable, so that the text input stays in the same place always (maybe just make the text input and quick message sticky?), the problem is that like when i chat, the text input gets clipped, and i have to scroll to see the bottom, which is annoying
- please also fix the ui issue where new chat should appear at the top
- update about me flow, since maybe the hero is a bit redundant, so maybe make it better formatted/layouted so that less redundant
- medyo na cut ang right side sa avatar once wave (only in home, contact is fine)
