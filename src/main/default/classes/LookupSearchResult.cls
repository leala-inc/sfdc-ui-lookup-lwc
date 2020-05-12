/**
 * Class used to serialize a single Lookup search result item
 * The Lookup controller returns a List<LookupSearchResult> when sending search result back to Lightning
 */
public class LookupSearchResult implements Comparable {
    private final SObject record;
    private final Id id;
    private final String sObjectType;
    private final String icon;
    private final String title;
    private final String subtitle;

    public LookupSearchResult(SObject record, String icon, String subtitleField) {
        this(
            (Id) record.get('id'),
            String.valueOf(record.getSObjectType()),
            icon,
            (String) record.get('name'),
            subtitleField == null ? null : (String) record.get(subtitleField)
        );
        this.record = record;
    }

    public LookupSearchResult(Id id, String sObjectType, String icon, String title, String subtitle) {
        this.id = id;
        this.sObjectType = sObjectType;
        this.icon = icon;
        this.title = title;
        this.subtitle = subtitle;
    }

    @AuraEnabled
    public SObject getRecord() {
        return record;
    }

    @AuraEnabled
    public Id getId() {
        return id;
    }

    @AuraEnabled
    public String getSObjectType() {
        return sObjectType;
    }

    @AuraEnabled
    public String getIcon() {
        return icon;
    }

    @AuraEnabled
    public String getTitle() {
        return title;
    }

    @AuraEnabled
    public String getSubtitle() {
        return subtitle;
    }

    /**
     * Allow to sort search results based on title
     */
    public Integer compareTo(Object compareTo) {
        LookupSearchResult other = (LookupSearchResult) compareTo;
        if (this.getTitle() == null) {
            return (other.getTitle() == null) ? 0 : 1;
        }
        if (other.getTitle() == null) {
            return -1;
        }
        return this.getTitle().compareTo(other.getTitle());
    }
}
