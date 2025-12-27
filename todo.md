# UI
- add a screen switch transition on navigator
- so much ui jank and less time so use shadcn

## SIGN UP/IN SCREEN
- use firebase for authentication probably using prisma orm

## HOME SCREEN
- today's top show
- list all tv shows and movies
- + use lazy load
- + use memo for useless re-render + (debouncing suggestions + abort request on cleanup) for mem leaks

## PROFILE VIEW
- watch history
- watch list
- signout screen

## SEARCH VIEW
- search with hashmaps + autocomplete [probably use webworker for efficiency]
- search params are ID, NAME, RELEASE YEAR

# FUNCTIONAL COMPONENTS
- search completion with debouncing
- offline support with status notifier
> NOT SURE
- offline working mechanism [use service worker probably very low time]
- watch history
- watchlist
- auth using firebase anonymous google sign
- probably use bundler with tree shaking






# CHECKLIST
[X] Landing page
[X] sign up/login ui
[X] search ui
[X] search login
[X] auth logic
[X] offline notifier
[X] Profile View
[] tree shaking
