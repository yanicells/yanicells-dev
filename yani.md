final checks
- responsiveness double check

important
- finish certificates 
- add certificates and awards page/section idk if need to be section or implemented somewhere, if so, maybe remove something like discovery? idk or still keep
- some things to consider, about me, experience (with toggle + add more shit there like prev stuff (shs)), tech stack, discovery, separate page (either main or under yani's cells)
- also think about maybe merging about me and discovery? since pretty similar
 
others
- page load animation? like fade in or something simple
- anime card (too much white space)
- there are other animes with notes "season 1 and 2" please update to separate
- help ui and content
- pls add like personal fav or masterpiece or idk tab sa spotify mga songs, naa sa tab sa top songs (last month, 6 months, all time, favs or idk) (medyo ako, multo, bubog, some olivia, bawat piyesa, sa'yo, iprapk, put to waste, hayaan) - slightly diff layout? or can be the same
    - maybe not as list like the other tabs, but more cards ish? have some space for personal comments? like a description, maybe even pop up modal
- add github commit somewhere
- update the ui for /discovery, it feels very out of place for some parts
- maybe remove 1 featured project, and that will be the commits, try to set it up for like past 6 months or so
- please update ai prompt, since its giving wrong and weird information, and please make sure the response animation (for typing) in the chatbot the same when you do quick message vs actually from ai, add also like only respond in bisaya/tagalog if the user is chatting in bisaya/tagalog, otherwise respond in english
- maybe update text input in premade chats (maybe just unselectable idk)
- check if i want to fix alignment of hero cta with the avatar, if center, baseline, or top
- add margin or padding sa bottom sa about me since medyo end abruply
- add breakpoints to remove certain stuff sa home page, like lessen quick message (maybe some always there, some random) based on breakpoints, remove yanicells.dev? or the ask me anything, something like that

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
- im summit + gdg with story (saying 2 ppt cram 1 hour before dedline not learning our lesson, maybe hackathon was friends we made)
- add digitalino n scroll sa projs n content is more experience
- add benkyo + make repo public
- add ycells to portfolio (check repo for guide)
- devcells add
    - devcells update sidebar and better ui for that, similar to react with its sub items, and fix also its like navigation since some nextjs stuff or tailwind or tanstack stuff redirect to react stuff which feels off for the ui

more tasks
- on startup dont select directly text box, since mobile opens the keyboard which is ass, maybe just do it for mobile, pc is okay
- as long as u keep the behavior that it selects text still after u send message
- for project detail page, allow multiple image, maybe main image, right sidebar others to click
- allow both album and song (in the same tab)

chore
- check greetings, make sure can fit in mobile
- one liner, have max words, make it fitting to the desciption like im yani
- make in discovery - explore and convo, same like card color/design with the 2x2 in the home page

fixes
- ensure the chat at / and saved chats, the scroll is only in the chat area, but the whole page should not be scrollable, so that the text input stays in the same place always (maybe just make the text input and quick message sticky?), the problem is that like when i chat, the text input gets clipped, and i have to scroll to see the bottom, which is annoying
- please also fix the ui issue where new chat should appear at the top

check
- implement caching for spotify api calls, maybe a cron job? or ill manually update a json file, this is for the top tracks, artists, genres
- update first user management, get the top endpoints result to work
- read docs https://developer.spotify.com/documentation/web-api/references/changes/march-2026

brah:
- add certificates and awards section
    - old ones and new ones
    - please do frontend masters so that it will be added
    - im summit gdg etc.
- update about me or something, like say that i used to think i was more of the type of person who likes black and white, math, logic, not more on creativity but now as i dig deeper into soft dev and web dev, i realized i also like being creative, i express this not through music, art, dance, or anything like that but through building things 
